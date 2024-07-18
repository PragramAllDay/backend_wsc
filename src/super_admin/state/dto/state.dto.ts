import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country_id: string;
}
