import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsUUID, Min } from 'class-validator';
import { Currency as CurrencyEnum, ProcessingType } from '@fa/common';

@ObjectType()
export class Transfer {
  @Field(() => String)
  id: string;

  @Field(() => String)
  status: string;

  @Field(() => Int)
  @Min(0)
  amount: number;

  @Field(() => String)
  @IsEnum(ProcessingType)
  type: string;

  @Field(() => String)
  @IsUUID()
  from: string;

  @Field(() => String)
  @IsUUID()
  to: string;
}

@ArgsType()
export class MakeTransferQuery {
  @Field(() => String)
  @IsEnum(ProcessingType, {
    message: `Type available values ${Object.values(ProcessingType).join(',')}`,
  })
  type: ProcessingType;

  @Field(() => Int)
  @Min(0)
  amount: number;

  @Field()
  @IsEnum(CurrencyEnum, {
    message: `Type available values ${Object.values(CurrencyEnum).join(',')}`,
  })
  currency: CurrencyEnum;

  @Field(() => String)
  @IsUUID()
  fromAccountId: string;

  @Field(() => String)
  @IsUUID()
  toAccountId: string;
}
