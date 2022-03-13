import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PROCESSING_KAFKA_CLIENT } from 'constants/constants';
import { TransferResolver } from './processing.resolver';
import { ConfigModule } from 'config/config.module';
import { ConfigService } from 'config/config.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PROCESSING_KAFKA_CLIENT,
        useFactory: async (appConfig: ConfigService) => {
          return {
            name: PROCESSING_KAFKA_CLIENT,
            transport: Transport.KAFKA,
            options: {
              ...appConfig.kafka,
            },
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [],
  providers: [TransferResolver],
})
export class ProcessingModule {}
