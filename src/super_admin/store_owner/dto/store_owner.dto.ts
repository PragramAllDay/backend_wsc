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

export class CreateStoreOwnerDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'password must be 8 characters long',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  middle_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsDate()
  dob: Date;

  @IsNotEmpty()
  @IsEnum(Title)
  title: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  telephone: string;
}
