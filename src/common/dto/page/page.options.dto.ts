import {
  IsOptional,
  IsEnum,
  IsNumber,
  IsString,
  Min,
  IsNotEmpty,
} from 'class-validator';

import { PageOrder } from 'src/enums';

export class PageOptionsDTO {
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(1)
  take: number = 50;

  @IsOptional()
  @IsEnum(PageOrder)
  order: PageOrder = PageOrder.DESC;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;
}
