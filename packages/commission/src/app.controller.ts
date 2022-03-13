import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommissionQuery, Balance } from '@fa/common';

const COMMISSION_SERVICE = 'CommissionService';
@Controller()
export class AppController {
  @GrpcMethod(COMMISSION_SERVICE)
  getCommission(data: CommissionQuery): Balance {
    return {
      ...data.amount,
      amount: 1,
    };
  }
}
