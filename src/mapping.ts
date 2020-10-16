import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  GToken,
  Approval,
  BurnLiquidityPoolPortion,
  CancelLiquidityPoolMigration,
  CompleteLiquidityPoolMigration,
  InitiateLiquidityPoolMigration,
  OwnershipTransferred,
  Transfer as TransferEvent,
  DepositCall,
  DepositUnderlyingCall,
  WithdrawCall,
  WithdrawUnderlyingCall
} from "../generated/GToken/GToken"

import { 
  Token,
  Transaction
} from '../generated/schema';

let whitelist: Array<string> = [
  '0xd4c84fc7d3ea365a2824a8c908f93136e625bcea'
]

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  /* let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.spender = event.params.spender

  // Entities can be written to the store with `.save()`
  entity.save() */

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.borrowingReserveUnderlying(...)
  // - contract.calcCostFromUnderlyingCost(...)
  // - contract.calcDepositCostFromShares(...)
  // - contract.calcDepositSharesFromCost(...)
  // - contract.calcUnderlyingCostFromCost(...)
  // - contract.calcWithdrawalCostFromShares(...)
  // - contract.calcWithdrawalSharesFromCost(...)
  // - contract.collateralizationRatio(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.depositFee(...)
  // - contract.exchangeRate(...)
  // - contract.increaseAllowance(...)
  // - contract.lendingReserveUnderlying(...)
  // - contract.liquidityPool(...)
  // - contract.liquidityPoolBurningRate(...)
  // - contract.liquidityPoolLastBurningTime(...)
  // - contract.liquidityPoolMigrationRecipient(...)
  // - contract.liquidityPoolMigrationUnlockTime(...)
  // - contract.miningExchange(...)
  // - contract.miningGulpRange(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.reserveToken(...)
  // - contract.stakesToken(...)
  // - contract.symbol(...)
  // - contract.totalReserve(...)
  // - contract.totalReserveUnderlying(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
  // - contract.underlyingToken(...)
  // - contract.withdrawalFee(...)
}

export function handleBurnLiquidityPoolPortion(
  event: BurnLiquidityPoolPortion
): void {}

export function handleCancelLiquidityPoolMigration(
  event: CancelLiquidityPoolMigration
): void {}

export function handleCompleteLiquidityPoolMigration(
  event: CompleteLiquidityPoolMigration
): void {}

export function handleInitiateLiquidityPoolMigration(
  event: InitiateLiquidityPoolMigration
): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: TransferEvent): void {};

// Deposit
export function handleDeposit(call: DepositCall): void {

  // Create a Mint entity
  let mint = Transaction.load(call.transaction.hash.toHex());

  // If there isn't a mint object create a new one
  if (mint == null) {
    mint = new Transaction(call.transaction.hash.toHex());
  }

  // Instantiate the GToken Contract
  let token_contract = GToken.bind(call.to);

  // To be used for amount received
  let totalReserve = token_contract.totalReserve();
  let totalSupply = token_contract.totalSupply();
  let depositFee = token_contract.depositFee();

  // Calculate the amount received
  let received = token_contract.calcDepositSharesFromCost(call.inputs._cost, totalReserve, totalSupply, depositFee);

  mint.from = call.from;
  mint.action = 'mint';
  mint.type = 'base';
  mint.sent = call.inputs._cost;
  mint.received = received.value0;
  mint.fee = received.value1;
  mint.block = call.block.number;

  mint.save();
}

// Deposit Underlying
export function handleDepositUnderlying(call: DepositUnderlyingCall): void {

  // Create a Mint entity
  let mint = Transaction.load(call.transaction.hash.toHex());

  // If there isn't a mint object create a new one
  if (mint == null) {
    mint = new Transaction(call.transaction.hash.toHex());
  }

  // Instantiate the GToken Contract
  let token_contract = GToken.bind(call.to);

  // To be used for amount received
  let exchangeRate = token_contract.exchangeRate();
  let underlyingConversion = token_contract.calcCostFromUnderlyingCost(call.inputs._underlyingCost, exchangeRate);
  let totalReserve = token_contract.totalReserve();
  let totalSupply = token_contract.totalSupply();
  let depositFee = token_contract.depositFee();

  // Calculate the amount received
  let received = token_contract.calcDepositSharesFromCost(underlyingConversion, totalReserve, totalSupply, depositFee);

  mint.from = call.from;
  mint.action = 'mint';
  mint.type = 'underlying';
  mint.sent = call.inputs._underlyingCost;
  mint.received = received.value0;
  mint.fee = received.value1;
  mint.block = call.block.number;

  mint.save();
}

// Withdraw
export function handleWithdraw(call: WithdrawCall): void {

  // Create a Mint entity
  let redeem = Transaction.load(call.transaction.hash.toHex());

  // If there isn't a mint object create a new one
  if (redeem == null) {
    redeem = new Transaction(call.transaction.hash.toHex());
  }

  // Instantiate the GToken Contract
  let token_contract = GToken.bind(call.to);

  // To be used for amount received
  let totalReserve = token_contract.totalReserve();
  let totalSupply = token_contract.totalSupply();
  let withdrawalFee = token_contract.withdrawalFee();

  // Calculate the amount received
  let received = token_contract.calcWithdrawalCostFromShares(call.inputs._grossShares, totalReserve, totalSupply, withdrawalFee);

  redeem.from = call.from;
  redeem.action = 'redeem';
  redeem.type = 'base';
  redeem.sent = call.inputs._grossShares;
  redeem.received = received.value0;
  redeem.fee = received.value1;
  redeem.block = call.block.number;

  redeem.save();
}

// Withdraw
export function handleWithdrawUnderlying(call: WithdrawUnderlyingCall): void {

  // Create a Mint entity
  let redeem = Transaction.load(call.transaction.hash.toHex());

  // If there isn't a mint object create a new one
  if (redeem == null) {
    redeem = new Transaction(call.transaction.hash.toHex());
  }

  // Instantiate the GToken Contract
  let token_contract = GToken.bind(call.to);

  // To be used for amount received
  let exchangeRate = token_contract.exchangeRate();
  let totalReserve = token_contract.totalReserve();
  let totalSupply = token_contract.totalSupply();
  let withdrawalFee = token_contract.withdrawalFee();
  let _cost = token_contract.calcWithdrawalCostFromShares(call.inputs._grossShares, totalReserve, totalSupply, withdrawalFee);

  // Calculate the amount received
  let received = token_contract.calcUnderlyingCostFromCost(_cost.value0, exchangeRate);

  redeem.from = call.from;
  redeem.action = 'redeem';
  redeem.type = 'base';
  redeem.sent = call.inputs._grossShares;
  redeem.received = received;
  redeem.fee = _cost.value1;
  redeem.block = call.block.number;

  redeem.save();
}