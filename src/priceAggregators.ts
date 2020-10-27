import { UniswapV2Pair } from '../generated/templates/GToken/UniswapV2Pair';
import { Token, TokenDailyData, DailyData, TotalValueLocked } from './../generated/schema';
import { BigDecimal, BigInt, ethereum, Address, log } from '@graphprotocol/graph-ts';
import { ONE_BI, ZERO_BD, ZERO_BI } from './helpers';
import { getPair } from './tokenPairRouter';

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

// Calculate current pair/eth price
export function calculateTokenCurrentPrice(token: Token): BigDecimal {

    let token_pair_address = getPair(token);

    // If the token pair exists return the current rate, else 0.
    if (token_pair_address == null) {
        return ZERO_BD;
    } else {
        let token_pair = UniswapV2Pair.bind(Address.fromString(token_pair_address));

        // Price in Eth
        let r0timesFactor = BigDecimal.fromString('100000000'); // 1e8
        let r1timesFactor = BigDecimal.fromString('1000000000000000000'); // 1e18
        let reserves0 = new BigDecimal(token_pair.getReserves().value0);
        let reserves1 = new BigDecimal(token_pair.getReserves().value1);

        let r0 = reserves0.div(r0timesFactor);
        let r1 = reserves1.div(r1timesFactor);

        let ethPrice = r1.div(r0);

        return ethPrice;
    }
}

// Update the total value locked
export function updateTotalValueLocked(mintTotalEth: BigDecimal, redeemTotalEth: BigDecimal): TotalValueLocked {
    
    // Get the total value locked
    let tvl = TotalValueLocked.load('1');

    if (tvl == null) {
        tvl = new TotalValueLocked('1');
        tvl.totalValueLockedETH = ZERO_BD;
        tvl.totalValueLockedUSD = ZERO_BD;
    }

    tvl.totalValueLockedETH = tvl.totalValueLockedETH.plus(mintTotalEth).minus(redeemTotalEth);
    tvl.totalValueLockedUSD = tvl.totalValueLockedUSD.plus(mintTotalEth.times(getETHCurrentPrice())).minus(redeemTotalEth.times(getETHCurrentPrice()));

    tvl.save();

    return tvl as TotalValueLocked;
}

// Update the daily data 
export function updateDailyData(call: ethereum.Call, token: Token, mintTotalReceived: BigInt, redeemTotalReceived: BigInt, mintCost: BigInt, redeemReceived: BigInt): void {

    let tokenFactor = BigDecimal.fromString('100000000'); // 1e8 for cTokens and gcTokens

    let timestamp = call.block.timestamp.toI32();
    let dayID = timestamp / 86400
    let dayStartTimestamp = dayID * 86400

    let dailyDataID = BigInt.fromI32(dayID).toString();

    let dailyData = DailyData.load(dailyDataID);

    if (dailyData == null) {
        dailyData = new DailyData(dailyDataID);
        dailyData.date = dayStartTimestamp;
        dailyData.txCount = ZERO_BI; 
        dailyData.dailyETHVolume = ZERO_BD;
        dailyData.dailyUSDVolume = ZERO_BD;
        dailyData.totalValueLockedETH = ZERO_BD;
        dailyData.totalValueLockedUSD = ZERO_BD;
    }   

    
    let token_eth_price = calculateTokenCurrentPrice(token);

    // Calculate the cumulative for the base asset in ETH
    let mint_volume_eth = new BigDecimal(mintTotalReceived);
    let redeem_volumen_eth = new BigDecimal(redeemTotalReceived);
    
    let BD_mint_volume_eth = mint_volume_eth.div(tokenFactor).times(token_eth_price);
    let BD_redeem_volume_eth = redeem_volumen_eth.div(tokenFactor).times(token_eth_price);

    dailyData.dailyETHVolume = BD_mint_volume_eth.plus(BD_redeem_volume_eth);
    dailyData.dailyUSDVolume = BD_mint_volume_eth.plus(BD_redeem_volume_eth).times(getETHCurrentPrice());

    // Get the total value locked on each day
    let currentEthTVL = BD_mint_volume_eth.minus(BD_redeem_volume_eth);
    let currentUsdTVL = (BD_mint_volume_eth.times(getETHCurrentPrice())).minus(BD_redeem_volume_eth.times(getETHCurrentPrice()));

    dailyData.totalValueLockedETH = currentEthTVL;
    dailyData.totalValueLockedUSD = currentUsdTVL;


    // Update the total value locked
    let BD_mint_cost = new BigDecimal(mintCost);
    let BD_redeem_received = new BigDecimal(redeemReceived);

    let tvl = updateTotalValueLocked(
        BD_mint_cost.div(tokenFactor).times(token_eth_price),
        BD_redeem_received.div(tokenFactor).times(token_eth_price),
    )

    dailyData.cumulativeTotalValueLockedETH = tvl.totalValueLockedETH;
    dailyData.cumulativeTotalValueLockedUSD = tvl.totalValueLockedUSD;

    dailyData.txCount = dailyData.txCount.plus(ONE_BI)
    dailyData.save()
}
 
// Update the daily data for a token
export function updateTokenDailyData(call: ethereum.Call, token: Token, mintCost: BigInt, mintReceived: BigInt, redeemCost: BigInt, redeemReceived: BigInt): void {
    
    let timestamp = call.block.timestamp.toI32();
    let dayID = timestamp / 86400
    let dayStartTimestamp = dayID * 86400

    let tokenDailyDataID = token.symbol
        .concat('_')
        .concat(BigInt.fromI32(dayID).toString());

    let tokenDailyData = TokenDailyData.load(tokenDailyDataID);

    if (tokenDailyData == null) {
        tokenDailyData = new TokenDailyData(tokenDailyDataID);
        tokenDailyData.date = dayStartTimestamp;
        tokenDailyData.avgPrice = ZERO_BD;
        tokenDailyData.txCount = ZERO_BI; 
        tokenDailyData.mintTotalSent = ZERO_BI;
        tokenDailyData.mintTotalReceived = ZERO_BI;
        tokenDailyData.redeemTotalSent = ZERO_BI;
        tokenDailyData.redeemTotalReceived = ZERO_BI;
        tokenDailyData.currentPrice = ZERO_BD;
    }   

    tokenDailyData.token = token.id;
    tokenDailyData.mintTotalSent = tokenDailyData.mintTotalSent.plus(mintCost);
    tokenDailyData.mintTotalReceived = tokenDailyData.mintTotalReceived.plus(mintReceived);
    tokenDailyData.redeemTotalSent = tokenDailyData.redeemTotalSent.plus(redeemCost);
    tokenDailyData.redeemTotalReceived = tokenDailyData.redeemTotalReceived.plus(redeemReceived);

    tokenDailyData.currentPrice = calculateTokenCurrentPrice(token).times(getETHCurrentPrice());
    tokenDailyData.currentEthPrice = calculateTokenCurrentPrice(token);
    
    
    tokenDailyData.txCount = tokenDailyData.txCount.plus(ONE_BI);
    tokenDailyData.save();

    // Update Daily Data aggregation
    updateDailyData(call, token, tokenDailyData.mintTotalSent, tokenDailyData.redeemTotalReceived, mintCost, redeemReceived );
}