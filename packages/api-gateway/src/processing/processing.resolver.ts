import { Inject, InternalServerErrorException } from '@nestjs/common';
import {
  Args,
  Field,
  Int,
  InterfaceType,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import { MakeTransferQuery, Transfer } from './processing.api';
import { PROCESSING_TRANSFER_CHANNEL } from '@fa/common';
import { PROCESSING_KAFKA_CLIENT } from 'constants/constants';
@InterfaceType()
export abstract class Character {
  @Field(() => Int)
  amount: number;

  @Field()
  currency: string;
}

@Resolver(() => Transfer)
export class TransferResolver {
  constructor(
    @Inject(PROCESSING_KAFKA_CLIENT) private processingClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.processingClient.subscribeToResponseOf(PROCESSING_TRANSFER_CHANNEL);
    await this.processingClient.connect();
  }

  @Mutation(() => Transfer)
  async makeTransfer(
    @Args({ type: () => MakeTransferQuery }) query: MakeTransferQuery,
  ) {
    const data = {
      type: query.type,
      amount: {
        amount: query.amount,
        currency: query.currency,
      },
      currency: query.currency,
      fromAccountId: query.fromAccountId,
      toAccountId: query.toAccountId,
    };
    return this.processingClient.send(PROCESSING_TRANSFER_CHANNEL, data);
  }
}
