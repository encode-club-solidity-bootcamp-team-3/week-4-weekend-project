import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokenDto } from './dtos/mintTokens.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/another-thing')
  getAnotherThing(): string {
    return this.appService.getAnotherThing();
  }

  @Get('/contract-address')
  getContractAddress(): { address: string } {
    return this.appService.getContractAddress();
  }

  @Get('/total-supply')
  getTotalSupply() {
    return this.appService.getTotalSupply();
  }

  @Get('/token-balance/:address')
  getTokenBalance(@Param('address') address: string) {
    return this.appService.getTokenBalance(address);
  }

  @Post('/mint-tokens')
  async mintTokens(@Body() body: MintTokenDto) {
    return this.appService.mintTokens(body.address, body.amount);
  }
}
