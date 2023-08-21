import { Module } from '@nestjs/common';
import { BallotContractController } from './ballot-contract.controller';
import { BallotContractService } from './ballot-contract.service';
import { TokenContractService } from 'src/token-contract/token-contract.service';

@Module({
  imports: [],
  controllers: [BallotContractController],
  providers: [BallotContractService, TokenContractService],
})
export class BallotContractModule {}
