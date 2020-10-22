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

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
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

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
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

  get miningToken(): Bytes {
    let value = this.get("miningToken");
    return value.toBytes();
  }

  set miningToken(value: Bytes) {
    this.set("miningToken", Value.fromBytes(value));
  }

  get reserveToken(): Bytes {
    let value = this.get("reserveToken");
    return value.toBytes();
  }

  set reserveToken(value: Bytes) {
    this.set("reserveToken", Value.fromBytes(value));
  }

  get stakesToken(): Bytes {
    let value = this.get("stakesToken");
    return value.toBytes();
  }

  set stakesToken(value: Bytes) {
    this.set("stakesToken", Value.fromBytes(value));
  }

  get underlyingToken(): Bytes {
    let value = this.get("underlyingToken");
    return value.toBytes();
  }

  set underlyingToken(value: Bytes) {
    this.set("underlyingToken", Value.fromBytes(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
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

  get txCount(): BigInt {
    let value = this.get("txCount");
    return value.toBigInt();
  }

  set txCount(value: BigInt) {
    this.set("txCount", Value.fromBigInt(value));
  }
}
