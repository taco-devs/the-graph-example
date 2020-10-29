import { Address, BigInt, ethereum, log } from "@graphprotocol/graph-ts"
import {
  GToken,
  Approval,
  BurnLiquidityPoolPortion,
  CancelLiquidityPoolMigration,
  CompleteLiquidityPoolMigration,
  InitiateLiquidityPoolMigration,
  OwnershipTransferred,
  Transfer as TransferEvent,
  TransferCall,
  DepositCall,
  DepositUnderlyingCall,
  WithdrawCall,
  WithdrawUnderlyingCall
} from "../generated/templates/GToken/GToken"

import { 
  Token,
  Transaction,
  User,
  UserBalance,
  TokenDailyData
} from '../generated/schema';

import {
  updateTokenDailyData
} from './priceAggregators';

import { ONE_BI, ZERO_BD, ZERO_BI } from './helpers'

// Constant types
const MINT = 'MINT';
const REDEEM = 'REDEEM';
const TRANSFER = 'TRANSFER';

// TokenManager
function getToken(address: Address): Token {

  // Get the User
  let token = Token.load(address.toHex());

  let token_contract = GToken.bind(address);

  if (token == null) {
    token = new Token(address.toHex());

    token.name = token_contract.name();
    token.symbol = token_contract.symbol();
    token.decimals = token_contract.decimals();
    token.miningToken = token_contract.miningToken();
    token.reserveToken = token_contract.reserveToken();
    token.stakesToken = token_contract.stakesToken()
    token.underlyingToken = token_contract.underlyingToken();
    token.totalSupply = ZERO_BI;
  }

  // Update the total supply after each transaction
  token.totalSupply = token_contract.totalSupply();
  token.totalReserve = token_contract.totalReserve();
  token.depositFee = token_contract.depositFee();
  token.withdrawalFee = token_contract.withdrawalFee();

  token.save();

  return token as Token;
}

// Aggregates the number of transactions done to the server
function transactionAggregator(address: Address, token: Token, amount: BigInt, type: String ): void {

  // Get the User
  let user = User.load(address.toHex());

  // If there isn't a user add a new one 
  if (user == null) {
    user = new User(address.toHex());
    user.address = address;
    user.transactions = ZERO_BI;
  }

  // Add a new transaction to the user
  user.transactions = user.transactions.plus(ONE_BI);

  // Add the transaction to the balances 
  let user_balance_id = token.symbol
    .concat('_')
    .concat(user.id);

  let user_balance = UserBalance.load(user_balance_id);

  if (user_balance == null) {
      user_balance = new UserBalance(user_balance_id);
      user_balance.token = token.id;
      user_balance.user = user.id;
      user_balance.amount = ZERO_BI;
  } 

  // Update the user balance
  if (type === MINT) {
        user_balance.amount = user_balance.amount.plus(amount);
  }

  if (type === REDEEM) {
        if (user_balance.amount.le(amount)) {
          user_balance.amount = ZERO_BI;
        } else {
          user_balance.amount = user_balance.amount.minus(amount);
        }
  }

  user.save();
  user_balance.save();
}


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

export function handleTransferEvent(event: TransferEvent): void {}

export function handleTransfer(call: TransferCall): void {
  
  log.info('Transfer detected', []);
  let token = getToken(call.to);

  
  // Create or load a new sender
  let sender_id = token.symbol.concat('_').concat(call.transaction.from.toHex());
  let sender_user_balance = UserBalance.load(sender_id);

  if (sender_user_balance == null) {
    sender_user_balance = new UserBalance(sender_id);
    
    // Create or Load an user
    // Handle 0 amount transfers
    let sender_user = User.load(call.transaction.from.toHex());

    if (sender_user == null) {
      sender_user = new User(call.transaction.from.toHex());
      sender_user.address = call.transaction.from;
    } 

    sender_user_balance.token = token.id;
    sender_user_balance.user = sender_user.id;
    sender_user_balance.amount = ZERO_BI;
    sender_user.save()
  } else {
    sender_user_balance.amount = sender_user_balance.amount.minus(call.inputs.amount);
  }

  // Create or load a new receiver
  let receiver_id = token.symbol.concat('_').concat(call.inputs.recipient.toHex())
  let receiver_user_balance = UserBalance.load(receiver_id);

  if (receiver_user_balance == null) {
    receiver_user_balance = new UserBalance(receiver_id);
    receiver_user_balance.amount = ZERO_BI;

    // Create or Load an user
    // Handle 0 amount transfers
    let receiver_user = User.load(call.inputs.recipient.toHex());

    if (receiver_user == null) {
      receiver_user = new User(call.inputs.recipient.toHex());
      receiver_user.address = call.inputs.recipient;
    } 

    receiver_user_balance.token = token.id;
    receiver_user_balance.user = receiver_user.id;
    receiver_user_balance.amount = receiver_user_balance.amount.plus(call.inputs.amount);
    
    receiver_user.save();
  }

  sender_user_balance.save();
  receiver_user_balance.save();

};

// Deposit
export function handleDeposit(call: DepositCall): void {

    let token = getToken(call.to);

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
    mint.to = call.to;
    mint.action = 'mint';
    mint.type = 'base';
    mint.sent = call.inputs._cost;
    mint.received = received.value0;
    mint.fee = received.value1;
    mint.block = call.block.number;
    mint.token = token.id;

    mint.save();

    // Handle transaction aggregation
    transactionAggregator(call.from, token, received.value0, MINT);
    updateTokenDailyData(call, token, call.inputs._cost, received.value0, ZERO_BI, ZERO_BI);
}

// Deposit Underlying
export function handleDepositUnderlying(call: DepositUnderlyingCall): void {

  // Handle transaction aggregation
  let token = getToken(call.to);

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
  mint.to = call.to;
  mint.action = 'mint';
  mint.type = 'underlying';
  mint.sent = call.inputs._underlyingCost;
  mint.received = received.value0;
  mint.fee = received.value1;
  mint.block = call.block.number;
  mint.token = token.id;

  mint.save();

  transactionAggregator(call.from, token, received.value0, MINT);
  updateTokenDailyData(call, token, underlyingConversion, received.value0, ZERO_BI, ZERO_BI);
}

// Withdraw
export function handleWithdraw(call: WithdrawCall): void {

  // Handle transaction aggregation
  let token = getToken(call.to);

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
  redeem.to = call.to;
  redeem.action = 'redeem';
  redeem.type = 'base';
  redeem.sent = call.inputs._grossShares;
  redeem.received = received.value0;
  redeem.fee = received.value1;
  redeem.block = call.block.number;
  redeem.token = token.id;

  redeem.save();

  transactionAggregator(call.from, token, call.inputs._grossShares, REDEEM);
  updateTokenDailyData(call, token, ZERO_BI, ZERO_BI, call.inputs._grossShares, received.value0);
}

// Withdraw
export function handleWithdrawUnderlying(call: WithdrawUnderlyingCall): void {

  // Handle transaction aggregation
  let token = getToken(call.to);

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
  redeem.to = call.to;
  redeem.action = 'redeem';
  redeem.type = 'underlying';
  redeem.sent = call.inputs._grossShares;
  redeem.received = received;
  redeem.fee = _cost.value1;
  redeem.block = call.block.number;
  redeem.token = token.id;

  redeem.save();

  transactionAggregator(call.from, token, call.inputs._grossShares, REDEEM);
  updateTokenDailyData(call, token, ZERO_BI, ZERO_BI, call.inputs._grossShares, _cost.value0);
}
