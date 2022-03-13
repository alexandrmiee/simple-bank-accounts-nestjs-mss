import { Injectable } from '@nestjs/common';
import { P2pProvider } from './transfers/p2p.provider';
import { Account as AccountEntity } from '../repository/account.entity';
import { AccountRepository } from '../repository/account.repository';
import { Account, Currency } from '@fa/common/src/types/account.types';

export interface TransferProps {
  fromAccountId: string;
  fromAmount: number;
  toAccountId: string;
  toAmount: number;
}

@Injectable()
export class AccountService {
  constructor(
    private accountRepository: AccountRepository,
    private p2pProvider: P2pProvider,
  ) {}

  async getAll(): Promise<Account[]> {
    const dbAccounts = (await this.accountRepository.findAll()) || [];
    return dbAccounts.map(this.mapToDto);
  }

  async findOne(id: string): Promise<Account> {
    const dbAccount = await this.accountRepository.findById(id);
    return this.mapToDto(dbAccount);
  }

  async deleteOne(id: string): Promise<Account> {
    const dbAccount = await this.accountRepository.delete(
      new AccountEntity({ id }),
    );
    return this.mapToDto(dbAccount);
  }

  async create(currency: Currency): Promise<Account> {
    const dbAccount = await this.accountRepository.save(
      new AccountEntity({
        currency,
      }),
    );
    return this.mapToDto(dbAccount as AccountEntity);
  }

  // you can only update overdraft option
  // use @transfer to change balance
  // use another account for new currency
  async update(account: Account): Promise<Account> {
    const oldAccount = await this.accountRepository.findById(account.id);
    if (!oldAccount) return;

    const dbAccount = await this.accountRepository.save(
      new AccountEntity({
        ...oldAccount,
        withOverdraft: account.withOverdraft,
      }),
    );
    return this.mapToDto(dbAccount as AccountEntity);
  }

  async canWithdraw(id: string, amount: number): Promise<boolean> {
    const account = await this.accountRepository.findById(id);
    if (!account) return false;
    return this.isBalanceOk(account.withOverdraft, account.balance, amount);
  }

  async transferP2p(data: TransferProps): Promise<{ items: Account[] }> {
    const result = await this.p2pProvider.transfer(data);
    return {
      items: result.map((x) => this.mapToDto(x as AccountEntity)),
    };
  }

  private isBalanceOk(withOverdraft: boolean, balance: number, amount: number) {
    return withOverdraft || balance > amount;
  }

  private mapToDto(entity: AccountEntity): Account {
    return {
      id: entity.id,
      withOverdraft: entity.withOverdraft,
      balance: {
        amount: entity.balance,
        currency: entity.currency,
      },
    };
  }
}
