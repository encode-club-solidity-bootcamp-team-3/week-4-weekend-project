import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BallotContractService } from './ballot-contract.service';
import { ApiTags } from '@nestjs/swagger';
import { DeployBallotContractDto } from 'src/dtos/DeployBallotContractDto.dto';

@ApiTags('ballot-contract')
@Controller({
  path: 'ballot-contract',
})
export class BallotContractController {
  constructor(private readonly contractService: BallotContractService) {}

  @Get('/:contractAddress')
  get(@Param('contractAddress') contractAddress: string) {
    return this.contractService.get(contractAddress);
  }

  @Get('/:contractAddress/voting-power/:walletAddress')
  votingPower(
    @Param('contractAddress') contractAddress: string,
    @Param('walletAddress') walletAddress: string,
  ) {
    return this.contractService.votingPower(contractAddress, walletAddress);
  }

  @Post('/deploy')
  deployContract(@Body() body: DeployBallotContractDto) {
    return this.contractService.deployContract(
      body.tokenContractAddress,
      body.proposals,
    );
  }
}
