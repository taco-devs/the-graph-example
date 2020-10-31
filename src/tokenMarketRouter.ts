import { log } from '@graphprotocol/graph-ts';
import { Token  } from './../generated/schema';

// Route Compound Market to address
export function getMarket(token: Token): string {

    if ("gcDAI".includes(token.symbol)) return '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643';
    if ("gcUSDC".includes(token.symbol)) return '0x39aa39c021dfbae8fac545936693ac917d5e7563';

    return "0x39aa39c021dfbae8fac545936693ac917d5e7563";
}