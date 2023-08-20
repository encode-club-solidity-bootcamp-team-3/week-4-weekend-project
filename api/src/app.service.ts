import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';
import * as tokenBallotJson from './assets/TokenizedBallot.json';


const CONTRACT_ADDRESS = '0x208F75C3A395Ad125D0D641D9a2648F837a58538';
const BALLOT_ADDRESS = '0x208F75C3A395Ad125D0D641D9a2648F837a58538';
//0x8a41e75fca1427d313a75de58c3739873e7175c3
//0x208F75C3A395Ad125D0D641D9a2648F837a58538
//ballot contract: 0x83611D5d1E4efc8c74B86090aA9CD304889d854a

@Injectable()
export class AppService {

  contract: ethers.Contract;
  contract_ballot: ethers.Contract;
  provider: ethers.Provider;
  wallet: ethers.Wallet;
  private proposals: string[] = []; //


  constructor() {
    const provider = new ethers.JsonRpcProvider(
        process.env.RPC_ENDPOINT_URL ?? '',
    )
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '', provider);
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, tokenJson.abi, wallet);
    this.contract_ballot = new ethers.Contract(BALLOT_ADDRESS, tokenBallotJson.abi, wallet);
  }


  getContractAddress():{address: string} {
    return {address: CONTRACT_ADDRESS};
  }

  getTotalSupply() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? '',);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '', provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, tokenJson.abi, wallet);
    return contract.totalSupply();
  }

  getTokenBalance(address: string) {
    return this.contract.balanceOf(address);


  }

  async mintTokens(address: string): Promise <any>{
    console.log("Minting tx to " + address)
    const tx = await this.contract.mint(address, ethers.parseUnits("1"));
    const receipt = await tx.wait(); 
    //return {result: true};
    return {success: true, txHash: '...'};

  }

  async selfDelegate(address: string): Promise <any>{
    console.log("Self delegating to " + address)
    const tx = await this.contract.delegate(address);
    const receipt = await tx.wait(); 
    //return {result: true};
    return {success: true, txHash: '...'};

  }

  getHello(): string {
    return 'Hello noWorld!';
  }
  getAnotherThing(): string {
    return 'Hello other thing!';
  }
  async createNewProposal(proposal: string): Promise <any>{
    console.log("New proposal " + proposal)
    this.proposals.push(proposal)
    //return {result: true};
    return {success: true, txHash: '...'};

  }
  //createNewProposal(proposal: string): void { //
   // this.proposals.push(proposal);//
  //}
  
  getProposals(): string[] {//
    return this.proposals;//
  }

}
