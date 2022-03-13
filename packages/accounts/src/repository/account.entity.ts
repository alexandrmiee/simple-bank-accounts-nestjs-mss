import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  RUB = 'RUB',
}

@Entity('Account')
export class Account {
  @PrimaryGeneratedColumn('uuid') public id: string;

  @Column({ type: 'integer' })
  public balance: number;

  @Column({
    type: 'enum',
    enum: Currency,
  })
  public currency: Currency;

  @Column({ type: 'boolean', nullable: false, default: false })
  public withOverdraft: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  constructor(data?: Partial<Account>) {
    Object.assign(this, data);
  }
}
