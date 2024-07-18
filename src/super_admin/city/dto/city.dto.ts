import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country_id: string;

  @IsNotEmpty()
  @IsString()
  state_id: string;
}
