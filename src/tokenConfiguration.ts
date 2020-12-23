import { log } from '@graphprotocol/graph-ts';
import { Token  } from './../generated/schema';
import { ConfigFile, GCTOKEN, STKGRO, PMT, GETH, GCETH } from './helpers';


function config(
    hasMiningToken: boolean, 
    hasStakesToken: boolean, 
    hasUnderlyingToken: boolean,
    hasGDAIReserve: boolean,
    priceStrategy: string,
    tokenFactor: i32
): ConfigFile {
    return {
        hasMiningToken,
        hasStakesToken,
        hasUnderlyingToken,
        hasGDAIReserve,
        priceStrategy,
        tokenFactor
    }
}

// Route pair to address
export function getConfig(symbol: string): ConfigFile {

    // Staked GRO 
    if ('stkGRO'.includes(symbol)) return config(false, false, false, false, STKGRO, 18);
    // PMT's
    if ('gWBTC'.includes(symbol)) return config(false, false, false, false, PMT, 8);
    if ('gETH'.includes(symbol)) return config(false, false, false, false, GETH, 18);
    if ('gDAI'.includes(symbol)) return config(false, false, false, false, PMT, 18);
    if ('gUSDC'.includes(symbol)) return config(false, false, false, false, PMT, 6);
    // gcTokens
    if ('gcWBTC'.includes(symbol)) return config(true, true, true, true, GCTOKEN, 8);
    if ('gcETH'.includes(symbol)) return config(true, true, true, true, GCETH, 8);
    if ('gcDAI'.includes(symbol)) return config(true, true, true, false, GCTOKEN, 8);
    if ('gcUSDC'.includes(symbol)) return config(true, true, true, false, GCTOKEN, 8);
    

    return config(false, false, false, false, GCTOKEN, 8);
}