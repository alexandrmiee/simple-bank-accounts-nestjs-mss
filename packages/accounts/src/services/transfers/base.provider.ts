import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Account } from 'src/repository/account.entity';
import { AccountRepository } from 'src/repository/account.repository';

import { Connection, EntityManager, getConnection } from 'typeorm';
import { TransferProps } from '../account.service';

@Injectable()
export abstract class BaseProvider {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    protected readonly accountRepository: AccountRepository,
  ) {}

  protected async withTransaction(): Promise<EntityManager> {
    return new Promise<EntityManager>((resolve) => {
      this.connection.transaction(async (entityManager) => {
        resolve(entityManager);
      });
    });
  }

  protected isBalanceOk(
    withOverdraft: boolean,
    balance: number,
    amount: number,
  ) {
    return withOverdraft || balance > amount;
  }

  protected async startTransaction() {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
  }

  abstract transfer(data: TransferProps): Promise<Account[]>;
}
