import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsUUID, Min } from 'class-validator';
import { Currency as CurrencyEnum } from '@fa/common';
@ObjectType()
export class Currency {
  @Field()
  amount: number;

  @Field()
  @IsEnum(CurrencyEnum, {
    message: `Currency available values ${Object.values(CurrencyEnum).join(
      ',',
    )}`,
  })
  currency: CurrencyEnum;
}

@ObjectType()
export class AccountDto {
  @Field(() => String)
  id: string;

  @Field(() => Currency)
  balance: object;

  @Field(() => Boolean)
  withOverdraft: boolean;
}

@ObjectType()
export class AccountsDto {
  @Field(() => [AccountDto])
  items: AccountDto[];
}

@ArgsType()
export class AccountIdQuery {
  @Field(() => String)
  @IsUUID()
  id: string;
}

@ArgsType()
export class CreateAccountQuery {
  @Field(() => String)
  @IsEnum(CurrencyEnum, {
    message: `Currency available values ${Object.values(CurrencyEnum).join(
      ',',
    )}`,
  })
  currency: CurrencyEnum;
}

@ArgsType()
export class UpdateAccountQuery {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field()
  @IsBoolean()
  withOverdraft: boolean;
}
