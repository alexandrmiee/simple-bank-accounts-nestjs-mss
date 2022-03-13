import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { TransferService } from '../services/transfer.service';
import {
  ACCOUNT_GRPC_CLIENT,
  COMMISSION_GRPC_CLIENT,
  CONVERTER_GRPC_CLIENT,
  PROCESSING_KAFKA_CLIENT,
} from '../constants/constatns';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { P2pProvider } from 'src/services/providers/p2p.provider';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ACCOUNT_GRPC_CLIENT,
        useFactory: async (appConfig: ConfigService) => {
          return {
            name: ACCOUNT_GRPC_CLIENT,
            transport: Transport.GRPC,
            options: {
              ...appConfig.grpcAccount,
            },
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
      {
        name: COMMISSION_GRPC_CLIENT,
        useFactory: async (appConfig: ConfigService) => {
          return {
            name: COMMISSION_GRPC_CLIENT,
            transport: Transport.GRPC,
            options: {
              ...appConfig.grpcCommission,
            },
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
      {
        name: CONVERTER_GRPC_CLIENT,
        useFactory: async (appConfig: ConfigService) => {
          return {
            name: CONVERTER_GRPC_CLIENT,
            transport: Transport.GRPC,
            options: {
              ...appConfig.grpcConverter,
            },
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
      {
        name: PROCESSING_KAFKA_CLIENT,
        useFactory: async (appConfig: ConfigService) => {
          return {
            name: CONVERTER_GRPC_CLIENT,
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
  controllers: [AppController],
  providers: [TransferService, P2pProvider],
})
export class AppModule {}
