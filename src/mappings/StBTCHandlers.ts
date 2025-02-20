// SPDX-License-Identifier: Apache-2.0

// Auto-generated

import assert from "assert";
import { StakedLog, TransferLog, UnStakedLog, } from "../types/abi-interfaces/StBTC";
import { BidoRecord } from "../types";

export async function handleStakedStBTCLog(log: StakedLog): Promise<void> {
  assert(log.args, "No log.args");
  const record = BidoRecord.create({
    id: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    contractAddress: log.address,
    referral: log.args.referral,
    amount: log.args.amount.toBigInt(),
    address: log.args.sender,
    action: 'stake',
    timestamp: log.block.timestamp,
  })
  await record.save()
}

export async function handleTransferStBTCLog(log: TransferLog): Promise<void> {
  assert(log.args, "No log.args");
  if (log.args.from == "0x0000000000000000000000000000000000000000") {
    return
  }
  const record_out = BidoRecord.create({
    id: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    contractAddress: log.address,
    amount: log.args.value.toBigInt(),
    address: log.args.from,
    action: 'transferOut',
    timestamp: log.block.timestamp,
  })
  const record_receive = BidoRecord.create({
    id: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    contractAddress: log.address,
    amount: log.args.value.toBigInt(),
    address: log.args.to,
    action: 'transferIn',
    timestamp: log.block.timestamp,
  })
  await record_out.save()
  await record_receive.save()
}

export async function handleUnStakedStBTCLog(log: UnStakedLog): Promise<void> {
  assert(log.args, "No log.args");
  const record = BidoRecord.create({
    id: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    contractAddress: log.address,
    amount: log.args.amount.toBigInt(),
    address: log.args.sender,
    action: 'unstake',
    timestamp: log.block.timestamp,
  })
  await record.save()
}
