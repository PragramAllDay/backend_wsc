import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCountryDTO {
  @ApiProperty({ example: 'Pakistan' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'PK' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'short_code must not be less than 2 characters long',
  })
  @MaxLength(2, {
    message: 'short_code must not be longer than 2 characters long',
  })
  short_code: string;

  @ApiProperty({ example: '+92' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'code must not be less than 3 characters long' })
  @MaxLength(3, { message: 'code must not be longer than 3 characters long' })
  code: string;
}
