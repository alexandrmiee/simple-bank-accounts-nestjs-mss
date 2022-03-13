import { Injectable } from '@nestjs/common';

import { Account } from 'src/repository/account.entity';
import { TransferProps } from '../account.service';
import { BaseProvider } from './base.provider';

@Injectable()
export class P2pProvider extends BaseProvider {
  async transfer(data: TransferProps): Promise<Account[]> {
    const queryRunner = await this.startTransaction();
    try {
      const [fromAccount, toAccount] = await Promise.all([
        this.accountRepository.findById(data.fromAccountId),
        this.accountRepository.findById(data.toAccountId),
      ]);
      if (!fromAccount || !toAccount) return;
      if (
        !this.isBalanceOk(
          fromAccount.withOverdraft,
          fromAccount.balance,
          data.fromAmount,
        )
      )
        return;

      const result = await queryRunner.manager.save([
        new Account({
          ...fromAccount,
          id: fromAccount.id,
          balance: fromAccount.balance - data.fromAmount,
        }),
        new Account({
          ...toAccount,
          id: toAccount.id,
          balance: toAccount.balance + data.toAmount,
        }),
      ]);
      await queryRunner.commitTransaction();

      return result as Account[];
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
