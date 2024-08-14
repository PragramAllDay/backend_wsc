import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateAttributeDto {
  @ApiProperty({ description: 'Name of the attribute' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID of the store this attribute belongs to' })
  @IsString()
  store_id: string;
}
