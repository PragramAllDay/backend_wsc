import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ description: 'ID of the store this supplier belongs to' })
  @IsNotEmpty()
  @IsString()
  store_id: string;

  @ApiProperty({ description: 'Name of the supplier' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the supplier', required: false })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Logo of the supplier',
    required: false,
    default: '',
  })
  @IsString()
  logo?: string = '';

  @ApiProperty({
    description: 'Website of the supplier',
    required: false,
    default: '',
  })
  @IsString()
  website?: string = '';

  @ApiProperty({
    description: 'Registration number of the supplier',
    required: false,
    default: '',
  })
  @IsString()
  reg_no?: string = '';

  @ApiProperty({
    description: 'VAT number of the supplier',
    required: false,
    default: '',
  })
  @IsString()
  vat_no?: string = '';
}
