import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsDate,
  IsEnum,
  IsEmail,
} from 'class-validator';

import { Title, Gender } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreOwnerDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'password must be 8 characters long',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  middle_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  dob: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Title)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  telephone: string;
}
