import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { ConfigUtils } from './config/config.utils';

async function bootstrap() {
  const appConfig = await ConfigUtils.getAppConfig();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        ...appConfig.grpc,
      },
    },
  );

  await app.listen();
}
bootstrap();
