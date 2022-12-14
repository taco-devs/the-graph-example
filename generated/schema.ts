// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Transaction entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transaction entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transaction", id.toString(), this);
  }

  static load(id: string): Transaction | null {
    return store.get("Transaction", id) as Transaction | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get action(): string {
    let value = this.get("action");
    return value.toString();
  }

  set action(value: string) {
    this.set("action", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get sent(): BigInt | null {
    let value = this.get("sent");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set sent(value: BigInt | null) {
    if (value === null) {
      this.unset("sent");
    } else {
      this.set("sent", Value.fromBigInt(value as BigInt));
    }
  }

  get received(): BigInt | null {
    let value = this.get("received");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set received(value: BigInt | null) {
    if (value === null) {
      this.unset("received");
    } else {
      this.set("received", Value.fromBigInt(value as BigInt));
    }
  }

  get fee(): BigInt | null {
    let value = this.get("fee");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set fee(value: BigInt | null) {
    if (value === null) {
      this.unset("fee");
    } else {
      this.set("fee", Value.fromBigInt(value as BigInt));
    }
  }

  get block(): BigInt | null {
    let value = this.get("block");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set block(value: BigInt | null) {
    if (value === null) {
      this.unset("block");
    } else {
      this.set("block", Value.fromBigInt(value as BigInt));
    }
  }

  get date(): i32 {
    let value = this.get("date");
    return value.toI32();
  }

  set date(value: i32) {
    this.set("date", Value.fromI32(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save User entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save User entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("User", id.toString(), this);
  }

  static load(id: string): User | null {
    return store.get("User", id) as User | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get transactions(): BigInt | null {
    let value = this.get("transactions");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set transactions(value: BigInt | null) {
    if (value === null) {
      this.unset("transactions");
    } else {
      this.set("transactions", Value.fromBigInt(value as BigInt));
    }
  }
}

export class UserBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save UserBalance entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save UserBalance entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("UserBalance", id.toString(), this);
  }

  static load(id: string): UserBalance | null {
    return store.get("UserBalance", id) as UserBalance | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get amount(): BigDecimal {
    let value = this.get("amount");
    return value.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get updated(): i32 {
    let value = this.get("updated");
    return value.toI32();
  }

  set updated(value: i32) {
    this.set("updated", Value.fromI32(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Token entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Token entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Token", id.toString(), this);
  }

  static load(id: string): Token | null {
    return store.get("Token", id) as Token | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get decimals(): i32 {
    let value = this.get("decimals");
    return value.toI32();
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }

  get isActive(): boolean {
    let value = this.get("isActive");
    return value.toBoolean();
  }

  set isActive(value: boolean) {
    this.set("isActive", Value.fromBoolean(value));
  }

  get hasMiningToken(): boolean {
    let value = this.get("hasMiningToken");
    return value.toBoolean();
  }

  set hasMiningToken(value: boolean) {
    this.set("hasMiningToken", Value.fromBoolean(value));
  }

  get miningToken(): Bytes {
    let value = this.get("miningToken");
    return value.toBytes();
  }

  set miningToken(value: Bytes) {
    this.set("miningToken", Value.fromBytes(value));
  }

  get miningTokenBalance(): BigInt {
    let value = this.get("miningTokenBalance");
    return value.toBigInt();
  }

  set miningTokenBalance(value: BigInt) {
    this.set("miningTokenBalance", Value.fromBigInt(value));
  }

  get hasStakesToken(): boolean {
    let value = this.get("hasStakesToken");
    return value.toBoolean();
  }

  set hasStakesToken(value: boolean) {
    this.set("hasStakesToken", Value.fromBoolean(value));
  }

  get stakesToken(): Bytes | null {
    let value = this.get("stakesToken");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set stakesToken(value: Bytes | null) {
    if (value === null) {
      this.unset("stakesToken");
    } else {
      this.set("stakesToken", Value.fromBytes(value as Bytes));
    }
  }

  get reserveToken(): Bytes {
    let value = this.get("reserveToken");
    return value.toBytes();
  }

  set reserveToken(value: Bytes) {
    this.set("reserveToken", Value.fromBytes(value));
  }

  get hasUnderlyingToken(): boolean {
    let value = this.get("hasUnderlyingToken");
    return value.toBoolean();
  }

  set hasUnderlyingToken(value: boolean) {
    this.set("hasUnderlyingToken", Value.fromBoolean(value));
  }

  get underlyingToken(): Bytes | null {
    let value = this.get("underlyingToken");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set underlyingToken(value: Bytes | null) {
    if (value === null) {
      this.unset("underlyingToken");
    } else {
      this.set("underlyingToken", Value.fromBytes(value as Bytes));
    }
  }

  get hasGDAIReserve(): boolean {
    let value = this.get("hasGDAIReserve");
    return value.toBoolean();
  }

  set hasGDAIReserve(value: boolean) {
    this.set("hasGDAIReserve", Value.fromBoolean(value));
  }

  get gDAIReserve(): BigInt {
    let value = this.get("gDAIReserve");
    return value.toBigInt();
  }

  set gDAIReserve(value: BigInt) {
    this.set("gDAIReserve", Value.fromBigInt(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get totalReserve(): BigInt {
    let value = this.get("totalReserve");
    return value.toBigInt();
  }

  set totalReserve(value: BigInt) {
    this.set("totalReserve", Value.fromBigInt(value));
  }

  get depositFee(): BigInt {
    let value = this.get("depositFee");
    return value.toBigInt();
  }

  set depositFee(value: BigInt) {
    this.set("depositFee", Value.fromBigInt(value));
  }

  get withdrawalFee(): BigInt {
    let value = this.get("withdrawalFee");
    return value.toBigInt();
  }

  set withdrawalFee(value: BigInt) {
    this.set("withdrawalFee", Value.fromBigInt(value));
  }

  get cumulativeTotalValueLockedETH(): BigDecimal {
    let value = this.get("cumulativeTotalValueLockedETH");
    return value.toBigDecimal();
  }

  set cumulativeTotalValueLockedETH(value: BigDecimal) {
    this.set("cumulativeTotalValueLockedETH", Value.fromBigDecimal(value));
  }

  get cumulativeTotalValueLockedUSD(): BigDecimal {
    let value = this.get("cumulativeTotalValueLockedUSD");
    return value.toBigDecimal();
  }

  set cumulativeTotalValueLockedUSD(value: BigDecimal) {
    this.set("cumulativeTotalValueLockedUSD", Value.fromBigDecimal(value));
  }

  get lastAvgPrice(): BigDecimal {
    let value = this.get("lastAvgPrice");
    return value.toBigDecimal();
  }

  set lastAvgPrice(value: BigDecimal) {
    this.set("lastAvgPrice", Value.fromBigDecimal(value));
  }

  get lastUSDPrice(): BigDecimal {
    let value = this.get("lastUSDPrice");
    return value.toBigDecimal();
  }

  set lastUSDPrice(value: BigDecimal) {
    this.set("lastUSDPrice", Value.fromBigDecimal(value));
  }

  get lastETHPrice(): BigDecimal {
    let value = this.get("lastETHPrice");
    return value.toBigDecimal();
  }

  set lastETHPrice(value: BigDecimal) {
    this.set("lastETHPrice", Value.fromBigDecimal(value));
  }

  get lastDelta(): BigDecimal {
    let value = this.get("lastDelta");
    return value.toBigDecimal();
  }

  set lastDelta(value: BigDecimal) {
    this.set("lastDelta", Value.fromBigDecimal(value));
  }

  get countTokenDailyDatas(): i32 {
    let value = this.get("countTokenDailyDatas");
    return value.toI32();
  }

  set countTokenDailyDatas(value: i32) {
    this.set("countTokenDailyDatas", Value.fromI32(value));
  }

  get listingDate(): i32 {
    let value = this.get("listingDate");
    return value.toI32();
  }

  set listingDate(value: i32) {
    this.set("listingDate", Value.fromI32(value));
  }

  get cumulativeDailyChange(): BigDecimal {
    let value = this.get("cumulativeDailyChange");
    return value.toBigDecimal();
  }

  set cumulativeDailyChange(value: BigDecimal) {
    this.set("cumulativeDailyChange", Value.fromBigDecimal(value));
  }

  get tokenDailyDatas(): Array<string> {
    let value = this.get("tokenDailyDatas");
    return value.toStringArray();
  }

  set tokenDailyDatas(value: Array<string>) {
    this.set("tokenDailyDatas", Value.fromStringArray(value));
  }
}

export class TokenDailyData extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TokenDailyData entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TokenDailyData entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TokenDailyData", id.toString(), this);
  }

  static load(id: string): TokenDailyData | null {
    return store.get("TokenDailyData", id) as TokenDailyData | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get date(): i32 {
    let value = this.get("date");
    return value.toI32();
  }

  set date(value: i32) {
    this.set("date", Value.fromI32(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get avgPrice(): BigDecimal {
    let value = this.get("avgPrice");
    return value.toBigDecimal();
  }

  set avgPrice(value: BigDecimal) {
    this.set("avgPrice", Value.fromBigDecimal(value));
  }

  get avgUnderlyingPrice(): BigDecimal {
    let value = this.get("avgUnderlyingPrice");
    return value.toBigDecimal();
  }

  set avgUnderlyingPrice(value: BigDecimal) {
    this.set("avgUnderlyingPrice", Value.fromBigDecimal(value));
  }

  get currentPrice(): BigDecimal {
    let value = this.get("currentPrice");
    return value.toBigDecimal();
  }

  set currentPrice(value: BigDecimal) {
    this.set("currentPrice", Value.fromBigDecimal(value));
  }

  get currentEthPrice(): BigDecimal {
    let value = this.get("currentEthPrice");
    return value.toBigDecimal();
  }

  set currentEthPrice(value: BigDecimal) {
    this.set("currentEthPrice", Value.fromBigDecimal(value));
  }

  get supply(): BigInt {
    let value = this.get("supply");
    return value.toBigInt();
  }

  set supply(value: BigInt) {
    this.set("supply", Value.fromBigInt(value));
  }

  get reserve(): BigInt {
    let value = this.get("reserve");
    return value.toBigInt();
  }

  set reserve(value: BigInt) {
    this.set("reserve", Value.fromBigInt(value));
  }

  get mintTotalSent(): BigInt {
    let value = this.get("mintTotalSent");
    return value.toBigInt();
  }

  set mintTotalSent(value: BigInt) {
    this.set("mintTotalSent", Value.fromBigInt(value));
  }

  get mintTotalReceived(): BigInt {
    let value = this.get("mintTotalReceived");
    return value.toBigInt();
  }

  set mintTotalReceived(value: BigInt) {
    this.set("mintTotalReceived", Value.fromBigInt(value));
  }

  get redeemTotalSent(): BigInt {
    let value = this.get("redeemTotalSent");
    return value.toBigInt();
  }

  set redeemTotalSent(value: BigInt) {
    this.set("redeemTotalSent", Value.fromBigInt(value));
  }

  get redeemTotalReceived(): BigInt {
    let value = this.get("redeemTotalReceived");
    return value.toBigInt();
  }

  set redeemTotalReceived(value: BigInt) {
    this.set("redeemTotalReceived", Value.fromBigInt(value));
  }

  get cumulativeTotalValueLockedETH(): BigDecimal {
    let value = this.get("cumulativeTotalValueLockedETH");
    return value.toBigDecimal();
  }

  set cumulativeTotalValueLockedETH(value: BigDecimal) {
    this.set("cumulativeTotalValueLockedETH", Value.fromBigDecimal(value));
  }

  get cumulativeTotalValueLockedUSD(): BigDecimal {
    let value = this.get("cumulativeTotalValueLockedUSD");
    return value.toBigDecimal();
  }

  set cumulativeTotalValueLockedUSD(value: BigDecimal) {
    this.set("cumulativeTotalValueLockedUSD", Value.fromBigDecimal(value));
  }

  get miningTokenBalance(): BigInt | null {
    let value = this.get("miningTokenBalance");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set miningTokenBalance(value: BigInt | null) {
    if (value === null) {
      this.unset("miningTokenBalance");
    } else {
      this.set("miningTokenBalance", Value.fromBigInt(value as BigInt));
    }
  }

  get txCount(): BigInt {
    let value = this.get("txCount");
    return value.toBigInt();
  }

  set txCount(value: BigInt) {
    this.set("txCount", Value.fromBigInt(value));
  }
}

export class DailyData extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save DailyData entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save DailyData entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("DailyData", id.toString(), this);
  }

  static load(id: string): DailyData | null {
    return store.get("DailyData", id) as DailyData | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get date(): i32 {
    let value = this.get("date");
    return value.toI32();
  }

  set date(value: i32) {
    this.set("date", Value.fromI32(value));
  }

  get dailyUSDVolume(): BigDecimal {
    let value = this.get("dailyUSDVolume");
    return value.toBigDecimal();
  }

  set dailyUSDVolume(value: BigDecimal) {
    this.set("dailyUSDVolume", Value.fromBigDecimal(value));
  }

  get dailyETHVolume(): BigDecimal {
    let value = this.get("dailyETHVolume");
    return value.toBigDecimal();
  }

  set dailyETHVolume(value: BigDecimal) {
    this.set("dailyETHVolume", Value.fromBigDecimal(value));
  }

  get totalValueLockedUSD(): BigDecimal {
    let value = this.get("totalValueLockedUSD");
    return value.toBigDecimal();
  }

  set totalValueLockedUSD(value: BigDecimal) {
    this.set("totalValueLockedUSD", Value.fromBigDecimal(value));
  }

  get totalValueLockedETH(): BigDecimal {
    let value = this.get("totalValueLockedETH");
    return value.toBigDecimal();
  }

  set totalValueLockedETH(value: BigDecimal) {
    this.set("totalValueLockedETH", Value.fromBigDecimal(value));
  }

  get cumulativeTotalValueLockedUSD(): BigDecimal {
    let value = this.get("cumulativeTotalValueLockedUSD");
    return value.toBigDecimal();
  }

  set cumulativeTotalValueLockedUSD(value: BigDecimal) {
    this.set("cumulativeTotalValueLockedUSD", Value.fromBigDecimal(value));
  }

  get cumulativeTotalValueLockedETH(): BigDecimal {
    let value = this.get("cumulativeTotalValueLockedETH");
    return value.toBigDecimal();
  }

  set cumulativeTotalValueLockedETH(value: BigDecimal) {
    this.set("cumulativeTotalValueLockedETH", Value.fromBigDecimal(value));
  }

  get txCount(): BigInt {
    let value = this.get("txCount");
    return value.toBigInt();
  }

  set txCount(value: BigInt) {
    this.set("txCount", Value.fromBigInt(value));
  }
}

export class TotalValueLocked extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TotalValueLocked entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TotalValueLocked entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TotalValueLocked", id.toString(), this);
  }

  static load(id: string): TotalValueLocked | null {
    return store.get("TotalValueLocked", id) as TotalValueLocked | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get totalValueLockedETH(): BigDecimal {
    let value = this.get("totalValueLockedETH");
    return value.toBigDecimal();
  }

  set totalValueLockedETH(value: BigDecimal) {
    this.set("totalValueLockedETH", Value.fromBigDecimal(value));
  }

  get totalValueLockedUSD(): BigDecimal {
    let value = this.get("totalValueLockedUSD");
    return value.toBigDecimal();
  }

  set totalValueLockedUSD(value: BigDecimal) {
    this.set("totalValueLockedUSD", Value.fromBigDecimal(value));
  }
}
