import { ApiProperty } from '@nestjs/swagger';

export class MintTokenDto {
  @ApiProperty({ type: String, required: true, default: 'My address' })
  address: string;
  @ApiProperty({ type: Number, required: true, default: 'Amount to mint' })
  amount: number;
}
