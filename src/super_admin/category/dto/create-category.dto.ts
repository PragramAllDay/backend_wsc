import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  IsArray,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Title of the category', example: 'Electronics' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Subtitle of the category',
    example: 'Gadgets and devices',
  })
  @IsString()
  sub_title: string;

  @ApiProperty({ description: 'Permalink', example: 'electronics' })
  @IsString()
  @Length(1, 255)
  permalink: string;

  @ApiProperty({
    description: 'Description of the category',
    example: 'All kinds of electronic items',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Meta title for SEO',
    example: 'Best Electronics',
  })
  @IsOptional()
  @IsString()
  meta_title?: string;

  @ApiProperty({
    description: 'Meta description for SEO',
    example: 'Find the best electronic items here',
  })
  @IsOptional()
  @IsString()
  meta_description?: string;

  @ApiProperty({
    description: 'Meta keywords for SEO',
    example: ['electronics', 'gadgets'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  meta_keywords?: string[];

  @ApiProperty({ description: 'Schema markup', example: '<schema>' })
  @IsOptional()
  @IsString()
  schema_markup?: string;

  @ApiProperty({
    description: 'Primary image URL',
    example: 'http://example.com/image1.jpg',
  })
  @IsString()
  image_primary: string;

  @ApiProperty({
    description: 'Secondary image URL',
    example: 'http://example.com/image2.jpg',
  })
  @IsOptional()
  @IsString()
  image_secondary?: string;

  @ApiProperty({
    description: 'Primary icon URL',
    example: 'http://example.com/icon1.jpg',
  })
  @IsString()
  icon_primary: string;

  @ApiProperty({
    description: 'Secondary icon URL',
    example: 'http://example.com/icon2.jpg',
  })
  @IsOptional()
  @IsString()
  icon_secondary?: string;

  @ApiProperty({ description: 'Sort order', example: 1 })
  @IsInt()
  @IsOptional()
  sort_order?: number;

  @ApiProperty({ description: 'Featured status', example: true })
  @IsBoolean()
  @IsOptional()
  is_featured?: boolean;

  @ApiProperty({ description: 'Active status', example: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ description: 'Slug', example: 'electronics' })
  @IsString()
  @IsOptional()
  slug: string;

  @ApiProperty({ description: 'Parent category ID', example: 'uuid' })
  @IsUUID()
  @IsOptional()
  parent_id?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
