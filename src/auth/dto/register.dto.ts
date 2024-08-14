import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
  IsEnum,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Gender, Title } from '@prisma/client';

export class CreateCustomerDto {
  @ApiPropertyOptional()
  @IsOptional()
  title?: Title;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sales_agent_code?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vatno?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  regno?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_vat?: boolean = true;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  discount?: number = 0;

  @ApiPropertyOptional({ example: 'Michael' })
  @IsOptional()
  @IsString()
  contact_person?: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiPropertyOptional({ example: 'city-uuid' })
  @IsOptional()
  @IsString()
  city_id?: string;

  @ApiPropertyOptional({ example: 'zip-code' })
  @IsOptional()
  @IsString()
  zip?: string;

  @ApiPropertyOptional({ example: 'address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  newsletter_subscription?: boolean = false;

  @ApiPropertyOptional({ example: 'Michael' })
  @IsOptional()
  @IsString()
  middle_name?: string;

  @ApiProperty({
    example: '1990-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  dob: Date;

  @ApiPropertyOptional({ enum: Gender, default: Gender.RATHER_NOT_SAY })
  @IsOptional()
  gender?: Gender;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  image_uri?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  special_price?: number = 0;
}
export class RegisterUserDto extends CreateCustomerDto {
  @ApiProperty({ example: 'securePassword123', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;
}
