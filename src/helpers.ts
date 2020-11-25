import { log, BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'

// Calculation type
export let GCTOKEN = 'GCTOKEN';
export let GRO = 'GRO';
export let STKGRO = 'STKGRO';

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
  priceStrategy: string
  tokenFactor: i32
}