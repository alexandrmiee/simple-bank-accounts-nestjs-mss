import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import { AccountRepository } from 'src/repository/account.repository';
import { Connection } from 'typeorm';
import { accounts } from './accounts.data';

export const seed = async () => {
  console.log(`-----------------------------`);
  console.log(`Seed Starting #${process.pid}`);

  const app = await NestFactory.create(AppModule, {
    logger: ['error'],
  });

  app.useLogger(null);

  const db = app.get<Connection>(Connection);

  await seedAccounts(db);

  console.log(`Seed Finished #${process.pid}`);
};

export const seedAccounts = async (db: Connection) => {
  const accountRepo = db.getCustomRepository(AccountRepository);
  await Promise.all(
    accounts.map(async (account) => {
      await accountRepo.save(account);
    }),
  ).catch(console.log);
};

seed().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
