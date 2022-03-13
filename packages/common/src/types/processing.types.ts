import { Balance, Currency } from "./account.types";

export const PROCESSING_TRANSFER_CHANNEL = "processing.transfer";

export enum ProcessingType {
  P2P = "p2p",
}

export enum ProcessingStatus {
  PROCESSING = "processing",
  DONE = "done",
  ERROR = "error",
  DECLINED = "declined",
}

export interface ProcessingQuery {
  type: ProcessingType;
  amount: Balance;
  currency: Currency;
  fromAccountId: string;
  toAccountId: string;
}

export interface ProcessingResult {
  id: string;
  status: ProcessingStatus;
  error?: string;
}
