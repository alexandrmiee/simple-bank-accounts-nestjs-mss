import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get env() {
    return this.configService.get<string>('NODE_ENV');
  }

  get grpc() {
    const packageName = this.configService.get<string>('GRPC_PACKAGE');
    return {
      url: this.configService.get<string>('GRPC_ADDRESS'),
      package: packageName,
      protoPath: require.resolve(`@fa/common/dist/api/${packageName}.proto`),
    };
  }

  get typeOrmForMigration() {
    return {
      logging: this.configService.get<string>('TYPEORM_LOGGING') === 'true',
      entities: ['dist/**/*.entity.{js,ts}'],
      migrations: ['migrations/[1234567890]*.ts'],
      synchronize: false,
      cli: {
        migrationsDir: 'migrations',
      },
    };
  }

  get typeOrmForProd() {
    return {
      logging: this.configService.get<string>('TYPEORM_LOGGING') === 'true',
      entities: ['dist/**/*.entity.{js,ts}'],
    };
  }

  get db(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: Number(this.configService.get<string>('POSTGRES_PORT')),
      username: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      database: this.configService.get<string>('POSTGRES_DB'),
      ssl: this.configService.get<string>('POSTGRES_SSL') === 'true',
      extra: {
        max: 30,
        connectionTimeoutMillis: 0,
        idleTimeoutMillis: 720000,
      },
    };
  }
}
