import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { MyToken } from 'src/assets/typechain-types/contracts/ERC20Votes.sol/MyToken';
import { MyToken__factory } from 'src/assets/typechain-types/factories/contracts/ERC20Votes.sol/MyToken__factory';

@Injectable()
export class TokenContractService {
  provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL);
  }

  async get(contractAddress: string) {
    const contract: MyToken = MyToken__factory.connect(
      contractAddress,
      this.provider,
    );

    const address = await contract.getAddress();
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const totalSupply = await contract.totalSupply();

    return {
      address,
      name,
      symbol,
      decimals: Number(decimals),
      totalSupply: Number(totalSupply),
    };
  }

  async getDecimals(contractAddress: string) {
    const contract: MyToken = MyToken__factory.connect(
      contractAddress,
      this.provider,
    );

    return await contract.decimals();
  }

  async getTokenBalances(
    contractAddress: string,
    walletAddress: string,
    targetBlockNumber: number,
  ) {
    const contract: MyToken = MyToken__factory.connect(
      contractAddress,
      this.provider,
    );

    const balance = await contract.balanceOf(walletAddress);
    const votes = await contract.getVotes(walletAddress);
    const pastVotes = await contract.getPastVotes(
      walletAddress,
      targetBlockNumber,
    );
    const decimals = await contract.decimals();
    const symbol = await contract.symbol();
    return {
      balance: Number(balance),
      votes: Number(votes),
      pastVotes: Number(pastVotes),
      decimals: Number(decimals),
      symbol,
    };
  }

  async deployContract() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, this.provider);
    const factory = new MyToken__factory(wallet);
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const [name, address] = await Promise.all([
      contract.name(),
      contract.getAddress(),
    ]);
    const transactionHash = contract.deploymentTransaction().hash;
    console.log(
      `The contract ${name} is deployed at address ${address}. The transaction is ${transactionHash}`,
    );
    return { name, address, transactionHash };
  }
}
