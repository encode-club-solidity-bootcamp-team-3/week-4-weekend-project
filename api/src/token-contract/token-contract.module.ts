import { Module } from '@nestjs/common';
import { TokenContractController } from './token-contract.controller';
import { TokenContractService } from './token-contract.service';

@Module({
  imports: [],
  controllers: [TokenContractController],
  providers: [TokenContractService],
})
export class TokenContractModule {}
