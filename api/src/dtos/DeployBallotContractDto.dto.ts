import { ApiProperty } from '@nestjs/swagger';

export class DeployBallotContractDto {
  @ApiProperty({
    type: String,
    required: true,
    default: 'Voting token contract address',
  })
  tokenContractAddress: string;
  @ApiProperty({ type: [String], required: true, default: 'Proposals' })
  proposals: string[];
}
