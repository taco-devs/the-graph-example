import { log } from '@graphprotocol/graph-ts';
import { Token  } from './../generated/schema';

// Route Compound Market to address
export function getMarket(token: Token): string {

    if ("gcWBTC".includes(token.symbol)) return '0xC11b1268C1A384e55C48c2391d8d480264A3A7F4';
    if ("gcETH".includes(token.symbol)) return '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5';
    if ("gcDAI".includes(token.symbol)) return '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643';
    if ("gcUSDC".includes(token.symbol)) return '0x39aa39c021dfbae8fac545936693ac917d5e7563';

    return "0x39aa39c021dfbae8fac545936693ac917d5e7563";
}