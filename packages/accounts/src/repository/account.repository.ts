import { Injectable } from '@nestjs/common';
import { EntityRepository, AbstractRepository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
@EntityRepository(Account)
export class AccountRepository extends AbstractRepository<Account> {
  public async findAll(): Promise<Account[]> {
    return this.createQueryBuilder('Account').getMany();
  }

  public async findById(id: string): Promise<Account> {
    return this.createQueryBuilder('Account')
      .where('"id" = :id', { id })
      .getOne();
  }

  public async findByIds(ids: string[]): Promise<Account[]> {
    return this.createQueryBuilder('Account')
      .where('"id" IN (:...ids)', { ids })
      .getMany();
  }

  public async save(entity: Account | Account[]) {
    return this.manager.save(entity);
  }

  public async delete(entity: Account) {
    return this.manager.softRemove(entity);
  }
}
