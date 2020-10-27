import { log } from '@graphprotocol/graph-ts';
import { Token  } from './../generated/schema';

// Route pair to address
export function getPair(token: Token): string {

    if (token.symbol === 'gcDAI') return '0x9896BD979f9DA57857322Cc15e154222C4658a5a';
    if (token.symbol === 'gcUSDC') return '0x477fa5406598f8eb1945291867e1654c4d931659';

    return '0x9896BD979f9DA57857322Cc15e154222C4658a5a';
}