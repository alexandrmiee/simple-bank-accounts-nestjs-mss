import { Injectable } from '@nestjs/common';
import {
  ProcessingQuery,
  ProcessingResult,
  ProcessingStatus,
  ProcessingType,
} from '@fa/common';
import { P2pProvider } from './providers/p2p.provider';

@Injectable()
export class TransferService {
  constructor(private p2pProvider: P2pProvider) {}

  async transfer(
    transferId: string,
    data: ProcessingQuery,
  ): Promise<ProcessingResult> {
    let status = ProcessingStatus.ERROR;
    try {
      switch (data.type) {
        case ProcessingType.P2P:
          status = await this.p2pProvider.transfer(data);
        default:
          break;
      }
    } catch (e) {
      return { id: transferId, status: ProcessingStatus.ERROR, error: e };
    }
    return { id: transferId, status };
  }
}
