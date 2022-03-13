import { Observable } from "rxjs";

export const ACCOUNTS_SERVICE = "AccountsService";
export enum Currency {
  USD = "USD",
  EUR = "EUR",
  RUB = "RUB",
}

export interface Balance {
  amount: number;
  currency: Currency;
}

export interface Account {
  id: string;
  balance: Balance;
  withOverdraft: boolean;
}

export interface AccountQuery {
  id?: string;
  ids?: string[];
}

export interface TransferQuery {
  fromAccountId: string;
  fromAmount: number;
  toAccountId: string;
  toAmount: number;
}

export interface CanWithdrawQuery {
  id: string;
  amount: number;
}

export interface Status {
  status: boolean;
}

export interface AccountsService {
  findOne(data: AccountQuery): Observable<Account>;
  getAll(data?: object): Observable<Account>;
  findByIds(data: AccountQuery): Observable<{ items: Account[] }>;
  deleteOne(data: AccountQuery): Observable<Account>;
  createOne(data?: object): Observable<Account>;
  updateOne(data: Partial<Account>): Observable<Account>;
  TransferP2p(data: TransferQuery): Observable<Account>;
  canWithdraw(data: CanWithdrawQuery): Observable<Status>;
}
