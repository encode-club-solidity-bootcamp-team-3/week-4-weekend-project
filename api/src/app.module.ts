import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenContractModule } from './token-contract/token-contract.module';
import { BallotContractModule } from './ballot-contract/ballot-contract.module';

@Module({
  imports: [BallotContractModule, TokenContractModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
