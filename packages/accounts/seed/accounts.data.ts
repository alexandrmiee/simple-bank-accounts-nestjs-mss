import { Currency } from '@fa/common/dist/types/account.types';
import { Account } from 'src/repository/account.entity';

export const accounts: Account[] = new Array<number>(10).fill(0).map(() => {
  return new Account({
    balance: Math.floor(Math.random() * 100),
    currency: Currency.EUR,
  });
});
