import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TokenContractService } from './token-contract.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('token-contract')
@Controller({
  path: 'token-contract',
})
export class TokenContractController {
  constructor(private readonly contractService: TokenContractService) {}

  @Get('/:contractAddress')
  verifyContract(@Param('contractAddress') contractAddress: string) {
    return this.contractService.get(contractAddress);
  }

  @Post('/deploy-contract')
  deployContract() {
    return this.contractService.deployContract();
  }

  @Get('/:contractAddress/balances-of/:walletAddress')
  getTokenBalances(
    @Param('contractAddress') contractAddress: string,
    @Param('walletAddress') walletAddress: string,
    @Query('targetBlockNumber') targetBlockNumber: number,
  ) {
    return this.contractService.getTokenBalances(
      contractAddress,
      walletAddress,
      targetBlockNumber,
    );
  }
}
