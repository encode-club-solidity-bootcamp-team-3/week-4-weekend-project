import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { TokenizedBallot } from 'src/assets/typechain-types/contracts/TokenizedBallot.sol/TokenizedBallot';
import { TokenizedBallot__factory } from 'src/assets/typechain-types/factories/contracts/TokenizedBallot.sol/TokenizedBallot__factory';
import { TokenContractService } from 'src/token-contract/token-contract.service';

@Injectable()
export class BallotContractService {
  tokenContractService: TokenContractService;
  provider: ethers.JsonRpcProvider;
  wallet: ethers.Wallet;

  constructor(tokenContractService: TokenContractService) {
    this.tokenContractService = tokenContractService;
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL);
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, this.provider);
  }

  async get(contractAddress: string) {
    const contract: TokenizedBallot = TokenizedBallot__factory.connect(
      contractAddress,
      this.provider,
    );

    // get the contract proposals and their vote count,
    // since we don't know the number of proposals,
    // we call the proposals() function until it throws an error.
    let i = 0;
    const proposals = [];
    while (i >= 0) {
      try {
        const proposal = await contract.proposals(i);
        proposals.push(proposal);
        i++;
      } catch (error) {
        i = -1;
      }
    }

    // proposals.sort((a, b) => Number(b.voteCount - a.voteCount));

    const address = await contract.getAddress();
    const tokenContractAddress = await contract.tokenContract();

    const results = proposals.map(({ name, voteCount }) => ({
      title: ethers.decodeBytes32String(name),
      votes: Number(voteCount),
    }));

    const targetBlockNumber = await contract.targetBlockNumber();

    const decimals = await this.tokenContractService.getDecimals(
      tokenContractAddress,
    );

    return {
      address,
      targetBlockNumber: Number(targetBlockNumber),
      proposals: results,
      tokenContractAddress,
      tokenContractDecimals: Number(decimals),
    };
  }

  async votingPower(contractAddress: string, walletAddress: string) {
    const contract: TokenizedBallot = TokenizedBallot__factory.connect(
      contractAddress,
      this.provider,
    );
    const votingPower = await contract.votingPower(walletAddress);
    return { votingPower: Number(votingPower) };
  }

  async deployContract(tokenContract: string, proposals: string[]) {
    console.log('🔥 deployContract', { tokenContract, proposals });
    const factory = new TokenizedBallot__factory(this.wallet);
    const targetBlockNumber = 0;
    const contract = await factory.deploy(
      tokenContract,
      targetBlockNumber,
      proposals,
    );
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    const transactionHash = contract.deploymentTransaction().hash;
    console.log(
      `The contract ${name} is deployed at address ${address}. The transaction is ${transactionHash}`,
    );
    return { name, address, transactionHash };
  }
}
