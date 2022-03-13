import {
  Inject,
  NotFoundException,
  OnModuleInit,
  InternalServerErrorException,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { AccountsService, ACCOUNTS_SERVICE } from '@fa/common';
import {
  AccountDto,
  AccountIdQuery,
  AccountsDto,
  CreateAccountQuery,
  UpdateAccountQuery,
} from './account.api';
import { ACCOUNT_GRPC_CLIENT } from 'constants/constants';

@Resolver(() => AccountDto)
export class AccountResolver implements OnModuleInit {
  private accountService: AccountsService;

  constructor(@Inject(ACCOUNT_GRPC_CLIENT) private accountClient: ClientGrpc) {}

  onModuleInit() {
    this.accountService =
      this.accountClient.getService<AccountsService>(ACCOUNTS_SERVICE);
  }

  @Query(() => AccountDto)
  async account(@Args({ type: () => AccountIdQuery }) query: AccountIdQuery) {
    try {
      return await this.accountService.findOne({ id: query.id }).toPromise();
    } catch {
      throw new NotFoundException();
    }
  }

  @Query(() => AccountsDto)
  async accounts() {
    return this.accountService.getAll({});
  }

  @Mutation(() => AccountDto)
  async deleteAccount(
    @Args({ type: () => AccountIdQuery }) query: AccountIdQuery,
  ) {
    try {
      return await this.accountService.deleteOne({ id: query.id }).toPromise();
    } catch {
      throw new NotFoundException();
    }
  }

  @Mutation(() => AccountDto)
  async createAccount(
    @Args({ type: () => CreateAccountQuery })
    query: CreateAccountQuery,
  ) {
    try {
      return await this.accountService
        .createOne({ currency: query.currency })
        .toPromise();
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Mutation(() => AccountDto)
  async updateAccount(
    @Args({ type: () => UpdateAccountQuery }) query: UpdateAccountQuery,
  ) {
    try {
      return await this.accountService
        .updateOne({
          id: query.id,
          withOverdraft: query.withOverdraft,
        })
        .toPromise();
    } catch {
      throw new NotFoundException();
    }
  }
}
