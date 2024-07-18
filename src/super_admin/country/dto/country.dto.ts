import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCountryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'short_code must not be less than 2 characters long',
  })
  @MaxLength(2, {
    message: 'short_code must not be longer than 2 characters long',
  })
  short_code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'code must not be less than 3 characters long' })
  @MaxLength(3, { message: 'code must not be longer than 3 characters long' })
  code: string;
}
