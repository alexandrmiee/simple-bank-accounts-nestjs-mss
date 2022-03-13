import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  Account,
  AccountsService,
  Balance,
  CommissionService,
  ConverterService,
  ProcessingQuery,
  ProcessingStatus,
} from '@fa/common';

@Injectable()
export abstract class BaseProvider {
  protected accountService: AccountsService;
  protected converterService: ConverterService;
  protected commissionService: CommissionService;

  constructor(
    @Inject('ACCOUNT_GRPC_CLIENT') private accountClient: ClientGrpc,
    @Inject('COMMISSION_GRPC_CLIENT') private commissionClient: ClientGrpc,
    @Inject('CONVERTER_GRPC_CLIENT') private converterClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.accountService =
      this.accountClient.getService<AccountsService>('AccountsService');
    this.converterService =
      this.converterClient.getService<ConverterService>('ConverterService');
    this.commissionService =
      this.commissionClient.getService<CommissionService>('CommissionService');
  }

  shouldConvert(from: Account, to: Account, money: Balance) {
    return (
      from.balance.currency !== to.balance.currency ||
      from.balance.currency !== money.currency ||
      to.balance.currency !== money.currency
    );
  }

  abstract transfer(data: ProcessingQuery): Promise<ProcessingStatus>;
}
