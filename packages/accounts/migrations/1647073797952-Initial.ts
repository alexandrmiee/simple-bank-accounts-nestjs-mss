import { MigrationInterface, QueryRunner } from 'typeorm';
import { addPK } from './MigrationHelper';

export class Initial16470737979528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TYPE "Currency_enum" AS ENUM('USD', 'EUR', 'RUB')`,
    );
    await queryRunner.query(
      `CREATE TABLE "Account" (
        "id" UUID NOT NULL DEFAULT UUID_generate_v4(),
        "balance" INTEGER NOT NULL DEFAULT 0, 
        "currency" "Currency_enum" NOT NULL,
        "withOverdraft" BOOLEAN NOT NULL DEFAULT FALSE,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "deletedAt" TIMESTAMP NULL,
        ${addPK('Account', ['id'])}
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "Account"`);
    await queryRunner.query(`DROP TYPE "Currency_enum"`);
  }
}
