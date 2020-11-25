import { CToken } from "../generated/templates/GToken/CToken"
import { ERC20 } from "../generated/templates/GToken/ERC20"
import { GToken } from "../generated/templates/GToken/GToken"
import { UniswapV2Pair } from '../generated/templates/GToken/UniswapV2Pair';
import { Token, TokenDailyData, DailyData, TotalValueLocked } from './../generated/schema';
import { BigDecimal, BigInt, ethereum, Address, log } from '@graphprotocol/graph-ts';
import { 
    ONE_BD, ONE_BI, ZERO_BD, ZERO_BI, exponentToBigDecimal,
 } from './helpers';
import {
    getConfig
} from './tokenConfiguration';
import {
    getETHCurrentPrice, calculateTokenCurrentPrice
} from './priceStrategies';

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

    // Get the token config
    let tokenConfig = getConfig(token.symbol);
    let tokenFactor = exponentToBigDecimal(tokenConfig.tokenFactor);

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
        tokenDailyData.supply = ZERO_BI;
        tokenDailyData.reserve = ZERO_BI;
        tokenDailyData.avgPrice = ZERO_BD;
        tokenDailyData.txCount = ZERO_BI; 
        tokenDailyData.mintTotalSent = ZERO_BI;
        tokenDailyData.mintTotalReceived = ZERO_BI;
        tokenDailyData.redeemTotalSent = ZERO_BI;
        tokenDailyData.redeemTotalReceived = ZERO_BI;
        tokenDailyData.currentPrice = ZERO_BD;

        tokenDailyData.miningTokenBalance = ZERO_BI;

        token.lastDelta = ZERO_BD;
        token.countTokenDailyDatas = token.countTokenDailyDatas + 1;
    }   

    // Instantiate
    let token_contract = GToken.bind(Address.fromString(token.id));
    let totalSupply = new BigDecimal(token_contract.totalSupply());
    let totalReserve = new BigDecimal(token_contract.totalReserve());

    tokenDailyData.token = token.id;
    tokenDailyData.supply = token_contract.totalSupply();
    tokenDailyData.reserve = token_contract.totalReserve();
    tokenDailyData.avgPrice = totalReserve.div(totalSupply);
    tokenDailyData.avgUnderlyingPrice = ZERO_BD;

    if (token.hasUnderlyingToken == true) {
        let totalReserveUnderlying = new BigDecimal(token_contract.totalReserveUnderlying());
        tokenDailyData.avgUnderlyingPrice = totalReserveUnderlying.div(totalSupply);
    }

    tokenDailyData.mintTotalSent = tokenDailyData.mintTotalSent.plus(mintCost);
    tokenDailyData.mintTotalReceived = tokenDailyData.mintTotalReceived.plus(mintReceived);
    tokenDailyData.redeemTotalSent = tokenDailyData.redeemTotalSent.plus(redeemCost);
    tokenDailyData.redeemTotalReceived = tokenDailyData.redeemTotalReceived.plus(redeemReceived);

    // Get the mining token balance
    if (token.hasMiningToken == true) {
        let mining_contract = ERC20.bind(token_contract.miningToken());
        tokenDailyData.miningTokenBalance = mining_contract.balanceOf(Address.fromString(token.id));
    }
    
    // Calculate token price * current avgPrice
    tokenDailyData.currentPrice = calculateTokenCurrentPrice(token).times(getETHCurrentPrice()).times(tokenDailyData.avgPrice);
    tokenDailyData.currentEthPrice = calculateTokenCurrentPrice(token).times(tokenDailyData.avgPrice);
    
    tokenDailyData.txCount = tokenDailyData.txCount.plus(ONE_BI);
    tokenDailyData.save();

    // Handle cumulative delta
    let yesterdayID = token.symbol
        .concat('_')
        .concat(BigInt.fromI32(dayID - 1).toString());
    let yesterdayTokenDailyData = TokenDailyData.load(yesterdayID);

    if (yesterdayTokenDailyData) {
        // Handle underlying vs base
        let changeDelta = ZERO_BD;

        if (token.hasUnderlyingToken == true) {
            changeDelta = (tokenDailyData.avgUnderlyingPrice.div(yesterdayTokenDailyData.avgUnderlyingPrice)).minus(ONE_BD);
        } else {
            changeDelta = (tokenDailyData.avgPrice.div(yesterdayTokenDailyData.avgPrice)).minus(ONE_BD);
        }
        
        token.cumulativeDailyChange = token.cumulativeDailyChange.minus(token.lastDelta).plus(changeDelta);
        token.lastDelta = changeDelta;
    } else {
        // Get first day delta
        let INITAL_RATE = ONE_BD;
        let changeDelta = ZERO_BD;

        changeDelta = tokenDailyData.avgPrice.minus(INITAL_RATE);

        token.cumulativeDailyChange = changeDelta;
        token.lastDelta = changeDelta;
    }

    // Save the last price 
    token.lastAvgPrice = totalReserve.div(totalSupply);


    // Update Daily Data aggregation
    updateDailyData(call, token, tokenDailyData.mintTotalSent, tokenDailyData.redeemTotalReceived, mintCost, redeemReceived );
    
    token.save();
}