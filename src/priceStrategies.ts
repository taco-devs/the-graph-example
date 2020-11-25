
import { CToken } from "../generated/templates/GToken/CToken"
import { ERC20 } from "../generated/templates/GToken/ERC20"
import { GToken } from "../generated/templates/GToken/GToken"
import { UniswapV2Pair } from '../generated/templates/GToken/UniswapV2Pair';
import { Token } from './../generated/schema';
import { BigDecimal, ethereum, Address, log } from '@graphprotocol/graph-ts';
import { 
    ONE_BD, ONE_BI, ZERO_BD, ZERO_BI, exponentToBigDecimal,
    GCTOKEN, STKGRO
 } from './helpers';
import { getPair } from './tokenPairRouter';
import { getMarket } from './tokenMarketRouter';
import {
    getConfig
  } from './tokenConfiguration';

  
const USDC_WETH_PAIR = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';

// Calculate the current eth price
export function getETHCurrentPrice(): BigDecimal {

    let pair = UniswapV2Pair.bind(Address.fromString(USDC_WETH_PAIR));
    
    // Price in Eth
    let r0timesFactor = BigDecimal.fromString('1000000'); // 1e6 USDC
    let r1timesFactor = BigDecimal.fromString('1000000000000000000'); // 1e18
    let reserves0 = new BigDecimal(pair.getReserves().value0);
    let reserves1 = new BigDecimal(pair.getReserves().value1);

    let r0 = reserves0.div(r0timesFactor);
    let r1 = reserves1.div(r1timesFactor);

    let ethPrice = r0.div(r1);

    return ethPrice;
}

// Calculate current pair/eth price with CTOKEN strategy
function gcTokenPriceStrategy(token: Token): BigDecimal {

    if (token.hasUnderlyingToken == false) return ZERO_BD;

    // Load Underlying token address to get decimals
    let underlying_address = Address.fromString(token.underlyingToken.toHexString());
    let underlying_token_contract = ERC20.bind(underlying_address);
    let underLying_decimals = underlying_token_contract.decimals();
    let ctoken_decimals = 8;
    
    // Get Compound Market
    let token_market_address = getMarket(token);
    let oneCTokenUnderlying = ONE_BD;

    if (token_market_address == null) {
        return ONE_BD;
    } else {
        let token_market = CToken.bind(Address.fromString(token_market_address));
        
        let exchangeRate = new BigDecimal(token_market.exchangeRateStored());
        let mantissa = exponentToBigDecimal(18 + underLying_decimals - ctoken_decimals);

        oneCTokenUnderlying = exchangeRate.div(mantissa);
    } 

    let token_pair_address = getPair(token);

    // If the token pair exists return the current rate, else 0.
    if (token_pair_address == null) {
        return ONE_BD;
    } else {
        let token_pair = UniswapV2Pair.bind(Address.fromString(token_pair_address));

        // Price in Eth
        let r0mantissa = exponentToBigDecimal(underLying_decimals); // Underlying decimals
        let r1mantissa = exponentToBigDecimal(18); // ETH decimals

        let reserves0 = new BigDecimal(token_pair.getReserves().value0);
        let reserves1 = new BigDecimal(token_pair.getReserves().value1);

        let r0 = reserves0.div(r0mantissa);
        let r1 = reserves1.div(r1mantissa);

        let ethPrice = r1.div(r0).times(oneCTokenUnderlying);

        log.info('Eth price for underlying {} is {}, r0: {}, r1 {}, er: {} ', [
            token.symbol,
            ethPrice.toString(),
            r0.toString(),
            r1.toString(),
            oneCTokenUnderlying.toString(),
        ])
        return ethPrice;
    }
}

// STKGRO price strategy
function stkGROPriceStrategy(token: Token): BigDecimal {

    // Get current stkGRO / GRO ratio
    let stk_contract = GToken.bind(Address.fromString(token.id));
    let BD_SUPPLY = new BigDecimal(stk_contract.totalSupply());
    let BD_RESERVE = new BigDecimal(stk_contract.totalReserve());
    let ratio = BD_RESERVE.div(BD_SUPPLY);

    // Get Uniswap Pair (GRO)
    let pair_adress = getPair(token);
    let pair = UniswapV2Pair.bind(Address.fromString(pair_adress));

    let reserves0 = new BigDecimal(pair.getReserves().value0);
    let reserves1 = new BigDecimal(pair.getReserves().value1);

    let ethPrice = reserves1.div(reserves0);

    log.info('Eth price for stkGRO {} is {}, r0: {}, r1 {}, er: {} ', [
        token.symbol,
        ethPrice.toString(),
        reserves0.toString(),
        reserves1.toString(),
        ratio.toString(),
    ])

    return ethPrice;

}

// Route between strategies
export function calculateTokenCurrentPrice(token: Token): BigDecimal {
    // Get the config
    let tokenConfig = getConfig(token.symbol);
    // Route the strategy
    if (tokenConfig.priceStrategy.includes(GCTOKEN)) return gcTokenPriceStrategy(token);
    if (tokenConfig.priceStrategy.includes(STKGRO)) return stkGROPriceStrategy(token);

    // If no matching strategy return 0
    return ZERO_BD;
}