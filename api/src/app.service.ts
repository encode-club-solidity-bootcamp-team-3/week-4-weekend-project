import { Injectable } from '@nestjs/common';
import { MyToken } from './assets/typechain-types/contracts/ERC20Votes.sol/MyToken';
import { MyToken__factory } from './assets/typechain-types/factories/contracts/ERC20Votes.sol/MyToken__factory';
import { ethers } from 'ethers';

// const CONTRACT_ADDRESS = '0x208F75C3A395Ad125D0D641D9a2648F837a58538';
const CONTRACT_ADDRESS = '0x64dc27fe475A9408dA8563800CBb3725C9B81694';

@Injectable()
export class AppService {
  contract: MyToken;
  provider: ethers.JsonRpcProvider;
  wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL);
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, this.provider);
    this.contract = MyToken__factory.connect(CONTRACT_ADDRESS, this.wallet);
  }

  getHello(): string {
    return 'Hello World!';
  }
  getAnotherThing(): string {
    return 'another thing';
  }
  getContractAddress(): { address: string } {
    return { address: CONTRACT_ADDRESS };
  }
  getTotalSupply() {
    return this.contract.totalSupply();
  }
  getTokenBalance(address: string) {
    return this.contract.balanceOf(address);
  }
  async mintTokens(address: string, amount: number) {
    const tx = await this.contract.mint(address, amount);
    return await tx.wait();
  }
}
