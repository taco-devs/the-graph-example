import { Token, TokenDailyData } from './../generated/schema';
import { BigDecimal, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { ONE_BI, ZERO_BD, ZERO_BI } from './helpers'

export function updateDailyData(call: ethereum.Call, token: Token, mintCost: BigInt, mintReceived: BigInt, redeemCost: BigInt, redeemReceived: BigInt): void {
    
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
    }   

    tokenDailyData.token = token.id;
    tokenDailyData.mintTotalSent = tokenDailyData.mintTotalSent.plus(mintCost);
    tokenDailyData.mintTotalReceived = tokenDailyData.mintTotalReceived.plus(mintReceived);
    tokenDailyData.redeemTotalSent = tokenDailyData.redeemTotalSent.plus(redeemCost);
    tokenDailyData.redeemTotalReceived = tokenDailyData.redeemTotalReceived.plus(redeemReceived);
    
    tokenDailyData.txCount = tokenDailyData.txCount.plus(ONE_BI);
    tokenDailyData.save();
}