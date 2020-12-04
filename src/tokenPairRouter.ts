import { log } from '@graphprotocol/graph-ts';
import { Token  } from './../generated/schema';

// Route pair to address
export function getPair(token: Token): string {

    // STKGRO
    if ('stkGRO'.includes(token.symbol)) return '0x208Bd5Dc470EbA21571ddB439801A614ed346376';
    // PMTs
    if ('gWBTC'.includes(token.symbol)) return '0xbb2b8038a1640196fbe3e38816f3e67cba72d940';
    if ('gETH'.includes(token.symbol)) return '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
    if ('gDAI'.includes(token.symbol)) return '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11';
    if ('gUSDC'.includes(token.symbol)) return '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
    // gcTokens
    if ('gcWBTC'.includes(token.symbol)) return '0xbb2b8038a1640196fbe3e38816f3e67cba72d940';
    if ('gETH'.includes(token.symbol)) return '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
    if ('gcDAI'.includes(token.symbol)) return '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11';
    if ('gcUSDC'.includes(token.symbol)) return '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';

    return '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
}