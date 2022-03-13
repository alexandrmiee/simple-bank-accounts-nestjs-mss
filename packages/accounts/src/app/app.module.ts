import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AccountService } from '../services/account.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { P2pProvider } from '../services/transfers/p2p.provider';
import { AccountRepository } from '../repository/account.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (appConfig: ConfigService) => {
        return {
          ...appConfig.db,
          ...appConfig.typeOrmForProd,
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([AccountRepository]),
  ],
  controllers: [AppController],
  providers: [AccountService, P2pProvider],
})
export class AppModule {}
