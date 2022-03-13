import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from 'config/config.module';
import { ConfigService } from 'config/config.service';
import { ACCOUNT_GRPC_CLIENT } from 'constants/constants';

import { AccountResolver } from './account.resolver';

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
    ]),
  ],
  controllers: [],
  providers: [AccountResolver],
})
export class AccountModule {}
