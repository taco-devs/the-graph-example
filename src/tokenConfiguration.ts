import { log } from '@graphprotocol/graph-ts';
import { Token  } from './../generated/schema';
import { ConfigFile, GCTOKEN, STKGRO } from './helpers';


function config(
    hasMiningToken: boolean, 
    hasStakesToken: boolean, 
    hasUnderlyingToken: boolean,
    priceStrategy: string,
    tokenFactor: i32
): ConfigFile {
    return {
        hasMiningToken,
        hasStakesToken,
        hasUnderlyingToken,
        priceStrategy,
        tokenFactor
    }
}

// Route pair to address
export function getConfig(symbol: string): ConfigFile {

    if ('gcDAI'.includes(symbol)) return config(true, true, true, GCTOKEN, 8);
    if ('gcUSDC'.includes(symbol)) return config(true, true, true, GCTOKEN, 8);
    if ('stkGRO'.includes(symbol)) return config(false, false, false, STKGRO, 18);

    return config(false, false, false, GCTOKEN, 8);
}