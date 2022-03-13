import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AccountService } from '../services/account.service';
import {
  Account,
  AccountQuery,
  CanWithdrawQuery,
  Currency,
  Status,
  TransferQuery,
} from '@fa/common/src/types/account.types';

export const ACCOUNTS_SERVICE = 'AccountsService';

@Controller()
export class AppController {
  constructor(private accountService: AccountService) {}

  @GrpcMethod(ACCOUNTS_SERVICE)
  async getAll(): Promise<{ items: Account[] }> {
    const items = await this.accountService.getAll();
    return { items };
  }

  @GrpcMethod(ACCOUNTS_SERVICE)
  async findOne(data: AccountQuery): Promise<Account> {
    return this.accountService.findOne(data.id || '');
  }

  @GrpcMethod(ACCOUNTS_SERVICE)
  async findByIds(data: AccountQuery): Promise<{ items: Account[] }> {
    const items = await this.accountService.getAll();
    return { items: items.filter((x) => data.ids.includes(x.id)) };
  }

  @GrpcMethod(ACCOUNTS_SERVICE)
  async deleteOne(data: AccountQuery): Promise<Account> {
    return this.accountService.deleteOne(data.id || '');
  }

  @GrpcMethod(ACCOUNTS_SERVICE)
  async updateOne(data: Account): Promise<Account> {
    return this.accountService.update(data);
  }

  @GrpcMethod(ACCOUNTS_SERVICE)
  async createOne(data: { currency: Currency }): Promise<Account> {
    return this.accountService.create(data.currency);
  }

  @GrpcMethod(ACCOUNTS_SERVICE)
  async canWithdraw(data: CanWithdrawQuery): Promise<Status> {
    const status = await this.accountService.canWithdraw(data.id, data.amount);
    return {
      status,
    };
  }

  @GrpcMethod(ACCOUNTS_SERVICE, 'TransferP2p')
  async transferP2p(data: TransferQuery): Promise<{ items: Account[] }> {
    return this.accountService.transferP2p(data);
  }

  // @GrpcMethod(ACCOUNTS_SERVICE)
  // withdraw(data: TransferQuery): Account[] {
  //   return { id: '1' };
  // }

  // @GrpcMethod(ACCOUNTS_SERVICE)
  // deposit(data: TransferQuery): Account[] {
  //   return { id: '1' };
  // }

  // @GrpcMethod(ACCOUNTS_SERVICE)
  // commit(data: TransferQuery): Account[] {
  //   return { id: '1' };
  // }

  // @GrpcMethod(ACCOUNTS_SERVICE)
  // rollback(data: TransferQuery): Account[] {
  //   return { id: '1' };
  // }
}
