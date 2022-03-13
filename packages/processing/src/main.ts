import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { ConfigUtils } from './config/config.utils';

async function bootstrap() {
  const appConfig = await ConfigUtils.getAppConfig();
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      ...appConfig.kafka,
    },
  });
  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
