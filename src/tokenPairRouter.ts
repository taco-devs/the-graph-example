import { log } from '@graphprotocol/graph-ts';
import { Token  } from './../generated/schema';

// Route pair to address
export function getPair(token: Token): string {

    if ('gcDAI'.includes(token.symbol)) return '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11';
    if ('gcUSDC'.includes(token.symbol)) return '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
    if ('stkGRO'.includes(token.symbol)) return '0x208Bd5Dc470EbA21571ddB439801A614ed346376';

    return '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
}