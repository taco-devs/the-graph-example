import { log, BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'

// Calculation type
export let BURN_ADDRESS = '0x0000000000000000000000000000000000000000';
export let GETH_BRIDGE = '0x04f555c05f2961137d135347402d6d3022d6e8f5';
export let GDAI_ADDRESS = '0x5301988A8EB906a65b57e9BAF4750A3C74e3E635';

export let PMT = 'PMT';
export let GCTOKEN = 'GCTOKEN';
export let GRO = 'GRO';
export let STKGRO = 'STKGRO';
export let GETH = 'GETH';
export let GCETH = 'GCETH';

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18);

export function toBigDecimal(number: i32): BigDecimal {
    let BI = new BigInt(number);
    return new BigDecimal(BI);
}

export function exponentToBigDecimal(decimals: i32): BigDecimal {
    let bd = BigDecimal.fromString('1')
    for (let i = 0; i < decimals; i++) {
      bd = bd.times(BigDecimal.fromString('10'))
    }
    return bd
  }


export class ConfigFile {
  hasMiningToken: boolean
  hasStakesToken: boolean
  hasUnderlyingToken: boolean
  hasGDAIReserve: boolean
  priceStrategy: string
  tokenFactor: i32
}