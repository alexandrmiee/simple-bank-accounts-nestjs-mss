import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ConvertQuery, ConvertResult } from '@fa/common';

const CONVERTER_SERVICE = 'ConverterService';

@Controller()
export class AppController {
  @GrpcMethod(CONVERTER_SERVICE)
  convert(data: ConvertQuery): ConvertResult {
    return {
      requestedAmount: {
        amount: data.from.amount,
        currency: data.from.currency,
      },
      resultedAmount: {
        amount: data.from.amount + 1,
        currency: data.to.currency,
      },
    };
  }
}
