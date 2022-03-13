import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

export class ConfigUtils {
  static async getAppConfig(): Promise<ConfigService> {
    @Module({
      imports: [ConfigModule],
    })
    class DummyModule {}

    const app = await NestFactory.create(DummyModule, {
      logger: ['warn', 'error'],
    });

    const configService = app.get(ConfigService);
    return configService;
  }
}
