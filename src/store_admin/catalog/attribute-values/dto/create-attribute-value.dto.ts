import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAttributeValueDto {
  @ApiProperty({ description: 'ID of the attribute this value belongs to' })
  @IsString()
  attribute_id: string;

  @ApiProperty({ description: 'Value of the attribute' })
  @IsString()
  attribute_value: string;
}
