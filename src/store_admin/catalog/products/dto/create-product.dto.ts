import { ApiProperty } from '@nestjs/swagger';
import { PackedAs } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ImageDto {
  @ApiProperty({
    description: 'URL of the image',
    example: 'https://abc.com/image',
  })
  @IsUrl()
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Indicates if the image is default',
    example: true,
  })
  @IsBoolean()
  is_default: boolean;
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  product_name: string;

  @ApiProperty({ required: false, default: '' })
  @IsString()
  @IsOptional()
  permalink?: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  product_code: string;

  @ApiProperty({ required: false, default: '' })
  @IsString()
  @IsOptional()
  measuring_unit?: string;

  @ApiProperty({ required: false, enum: PackedAs })
  @IsOptional()
  packed_as?: PackedAs;

  @ApiProperty({ required: false, default: '' })
  @IsString()
  @IsOptional()
  product_range?: string;

  @ApiProperty()
  @IsString()
  custom_code: string;

  @ApiProperty({ default: 0 })
  @IsNumber()
  vat: number;

  @ApiProperty({ default: 0 })
  @IsNumber()
  length: number;

  @ApiProperty({ default: 0 })
  @IsNumber()
  width: number;

  @ApiProperty({ default: 0 })
  @IsNumber()
  height: number;

  @ApiProperty({ default: 0 })
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsString()
  isle_no: string;

  @ApiProperty()
  @IsString()
  short_description: string;

  @ApiProperty()
  @IsString()
  full_description: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  is_featured: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  is_special: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  free_shipping: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  keywords?: string;

  @ApiProperty()
  @IsString()
  related_products: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  meta_description: string;

  @ApiProperty({ default: 'Default' })
  @IsString()
  view: string;

  @ApiProperty()
  @IsString()
  meta_keywords: string;

  @ApiProperty({ example: 'UUID' })
  @IsUUID()
  store_id: string;

  @ApiProperty({ example: 'UUID' })
  @IsUUID()
  supplier_id: string;

  @ApiProperty({
    type: [ImageDto],
    required: false,
    description: 'List of images',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  images?: ImageDto[];

  @ApiProperty({
    type: [String],
    required: false,
    description: 'List of attributes ids',
    example: ['UUID'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  attributes?: string[];

  @ApiProperty({ type: [String], required: false, example: ['UUID'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  categories?: string[];
}
