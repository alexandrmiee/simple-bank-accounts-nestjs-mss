import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Balance, ProcessingQuery, ProcessingStatus } from '@fa/common';

import { BaseProvider } from './base.provider';

@Injectable()
export class P2pProvider extends BaseProvider {
  async transfer(data: ProcessingQuery): Promise<ProcessingStatus> {
    let status = ProcessingStatus.PROCESSING;
    try {
      const { items } = await firstValueFrom(
        this.accountService.findByIds({
          ids: [data.fromAccountId, data.toAccountId],
          id: '',
        }),
      );
      const fromAccount = items.find((x) => x.id === data.fromAccountId);
      const toAccount = items.find((x) => x.id === data.toAccountId);

      const commission = await firstValueFrom(
        this.commissionService.getCommission({
          account: fromAccount,
          amount: data.amount,
        }),
      );
      // looks like commission should be in account currency
      let fromAmount: Balance = {
        amount: data.amount.amount + commission.amount,
        currency: data.currency,
      };
      let toAmount: Balance = {
        amount: data.amount.amount,
        currency: data.currency,
      };
      if (this.shouldConvert(fromAccount, toAccount, data.amount)) {
        const { requestedAmount, resultedAmount } = await firstValueFrom(
          this.converterService.convert({
            from: data.amount,
            to: toAccount.balance,
          }),
        );
        fromAmount = requestedAmount;
        toAmount = resultedAmount;
      }
      const canTransfer = await firstValueFrom(
        this.accountService.canWithdraw({
          id: fromAccount.id,
          amount: fromAmount.amount,
        }),
      );
      if (canTransfer.status) {
        await firstValueFrom(
          this.accountService.TransferP2p({
            fromAccountId: fromAccount.id,
            toAccountId: toAccount.id,
            fromAmount: fromAmount.amount,
            toAmount: toAmount.amount,
          }),
        );
        status = ProcessingStatus.DONE;
      } else {
        status = ProcessingStatus.DECLINED;
      }
    } catch (e) {
      status = ProcessingStatus.ERROR;
    } finally {
      return status;
    }
  }
}
