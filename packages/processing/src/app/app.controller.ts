import { Controller, Inject } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { PROCESSING_KAFKA_CLIENT } from 'src/constants/constatns';
import { TransferService } from '../services/transfer.service';

@Controller()
export class AppController {
  // @Client({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'processing-1',
  //       brokers: ['localhost:29092'],
  //     },
  //     consumer: {
  //       groupId: 'processing-consumer-1',
  //     },
  //   },
  // })
  // processingClient: ClientKafka;

  constructor(
    @Inject(PROCESSING_KAFKA_CLIENT) private processingClient: ClientKafka,
    private transferService: TransferService,
  ) {}

  async onModuleInit() {
    this.processingClient.subscribeToResponseOf('processing.transfer');
    await this.processingClient.connect();
  }

  @MessagePattern('processing.transfer')
  transfer(@Payload() message: any): any {
    return this.transferService.transfer(message.timestamp, message.value);
  }
}
