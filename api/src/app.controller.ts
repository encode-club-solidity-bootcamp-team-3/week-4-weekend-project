
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokenDto } from './dtos/mintToken.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("another-thing")
  getAnotherThing(): string {
    return this.appService.getAnotherThing();
  }

  @Get('contract-address')
  getContractAddress(): {address: string} {
    return this.appService.getContractAddress();

  }

  
  @Get('total-supply')
  getTotalSupply() {
    return this.appService.getTotalSupply();

  }

  @Get('token-balance/:address')
  getTokenBalance(@Param('address') address) {
    return this.appService.getTokenBalance(address);

  }

  @Post('mint-tokens')
  async mintTokens(@Body() body: MintTokenDto) {
    console.log( body );
    return await this.appService.mintTokens(body.address);

  }


  @Post('self-delegate')
  async selfDelegate(@Body() body: MintTokenDto) {
    console.log( body );
    return await this.appService.selfDelegate(body.address);

  }

  @Post('create-proposal') //
createProposal(@Body() body: { proposal: string }) {
  console.log( body);
  try {
    this.appService.createNewProposal(body.proposal);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

@Get('proposals')//
getProposals() {
  return this.appService.getProposals();
}
 
}
