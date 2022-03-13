import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

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
}
