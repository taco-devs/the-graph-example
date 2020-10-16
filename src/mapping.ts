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
  DepositCall
  // Transfer
} from "../generated/GToken/GToken"

import { Transfer, Transaction, Token } from '../generated/schema';

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

export function handleTransfer(event: TransferEvent): void {

  // Get the transaction if it already exists
  let transaction = Transaction.load(event.transaction.hash.toHex());

  // Create the transaction if it doesn't 
  if (transaction == null) {
    transaction = new Transaction(event.transaction.hash.toHex());
    transaction.from = event.transaction.from;
  }

  // Get the Transfer if it already exists
  let transfer = Transfer.load(event.transactionLogIndex.toHex());

  if (transfer == null) {
    transfer = new Transfer(event.transactionLogIndex.toHex());
  }

  // Get the mint token
  let fromToken = Token.load(event.params.from.toHex());

  if (fromToken == null) {
    fromToken = new Token(event.params.from.toHex());
    
    let Token = GToken.bind(event.params.from);

    if (Token) {
      fromToken.name = Token.name();
      fromToken.symbol = Token.symbol();
    }
  }
  
  transfer.transaction = transaction.id;
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.amount = event.params.value;
  transfer.fromToken = fromToken.id;

  fromToken.save();
  transaction.save();
  transfer.save();
}

// Deposit
export function handleDeposit(call: DepositCall): void {

  let entity = Transaction.load(call.transaction.hash.toHex());

  if (entity == null) {
    entity = new Transaction(call.transaction.hash.toHex());
  }

  entity.from = call.transaction.from;
  entity.save();
}

export function handleInitialBlock(block: ethereum.Block): void {
  const INITIAL_BLOCK = '21431182';
  const TOKEN_ADDRESS = '0xD4c84Fc7d3EA365A2824A8C908f93136e625bCeA';

/*   if (INITIAL_BLOCK === block.number.toString()){
    // Init Block
    let token = new Token(TOKEN_ADDRESS);
    token.name = 'gcDAI';
    token.symbol = 'gcDAI';

    token.save();
  } */
  let token = new Token(TOKEN_ADDRESS);
    token.name = 'gcDAI';
    token.symbol = 'gcDAI';

    token.save();
}