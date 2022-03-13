import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get env() {
    return this.configService.get<string>('NODE_ENV');
  }

  get grpcAccount() {
    const packageName = this.configService.get<string>('GRPC_ACCOUNT_PACKAGE');
    return {
      url: this.configService.get<string>('GRPC_ACCOUNT_ADDRESS'),
      package: packageName,
      protoPath: require.resolve(`@fa/common/dist/api/${packageName}.proto`),
    };
  }

  get grpcCommission() {
    const packageName = this.configService.get<string>(
      'GRPC_COMMISSION_PACKAGE',
    );
    return {
      url: this.configService.get<string>('GRPC_COMMISSION_ADDRESS'),
      package: packageName,
      protoPath: require.resolve(`@fa/common/dist/api/${packageName}.proto`),
    };
  }

  get grpcConverter() {
    const packageName = this.configService.get<string>(
      'GRPC_CONVERTER_PACKAGE',
    );
    return {
      url: this.configService.get<string>('GRPC_CONVERTER_ADDRESS'),
      package: packageName,
      protoPath: require.resolve(`@fa/common/dist/api/${packageName}.proto`),
    };
  }

  get kafka() {
    return {
      client: {
        clientId: this.configService.get<string>('KAFKA_CLIENT_ID'),
        brokers: [this.configService.get<string>('KAFKA_BROKER')],
      },
      consumer: {
        groupId: this.configService.get<string>('KAFKA_GROUP_ID'),
      },
    };
  }
}
