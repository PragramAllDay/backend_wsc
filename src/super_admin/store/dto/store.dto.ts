import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
  IsEmail,
  IsNumber,
  IsBoolean,
  IsUUID,
  IsDate,
  IsPositive,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class StorePaypalDetailDto {
  // @ApiProperty({ example: 'UUID of the PayPal detail' })
  // @IsUUID()
  // @IsOptional()
  // id?: string;

  @ApiProperty({ example: 'paypal@example.com' })
  @IsEmail()
  store_paypal_email: string;

  @ApiProperty({ example: 'paypal_api_username' })
  @IsString()
  store_paypal_api_username: string;

  @ApiProperty({ example: 'paypal_api_password' })
  @IsString()
  store_paypal_api_password: string;

  @ApiProperty({ example: 'paypal_api_signature' })
  @IsString()
  store_paypal_api_signature: string;
}
export class StoreSocialMediaDto {
  @ApiProperty({ example: 'facebook_handle' })
  @IsString()
  store_facebook: string;

  @ApiProperty({ example: 'twitter_handle' })
  @IsString()
  store_twitter: string;

  @ApiProperty({ example: 'google_plus_handle' })
  @IsString()
  store_google_plus: string;

  @ApiProperty({ example: 'pinterest_handle' })
  @IsString()
  store_pinterest: string;
}
export class StoreCardPaymentDetailDto {
  @ApiProperty({ example: 'Card Payment Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Card Payment Detail in JSON format' })
  @IsNotEmpty()
  detail: any;
}
export class CreateStoreDto {
  @ApiProperty({ example: 'My Store' })
  @IsString()
  @IsNotEmpty()
  store_name: string;

  @ApiProperty({ example: 'my-store' })
  @IsString()
  @IsNotEmpty()
  spermalink: string;

  @ApiProperty({ example: 1000.0, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  rent_per_month?: number;

  @ApiProperty({ example: 100.0, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  minimum_order?: number;

  @ApiProperty({ example: 10.0, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  commission_percentage?: number;

  @ApiProperty({ example: '123456789' })
  @IsString()
  @IsNotEmpty()
  vat_number: string;

  @ApiProperty({ example: '987654321' })
  @IsString()
  @IsNotEmpty()
  registration_number: string;

  @ApiProperty({ example: 'https://example.com/logo.png', required: false })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({
    example: 'https://example.com/icon_primary.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  icon_primary?: string;

  @ApiProperty({
    example: 'https://example.com/icon_secondary.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  icon_secondary?: string;

  @ApiProperty({
    example: 'https://example.com/banner_primary.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  banner_primary?: string;

  @ApiProperty({
    example: 'https://example.com/banner_secondary.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  banner_secondary?: string;

  @ApiProperty({
    example: 'https://example.com/side_banner_primary.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  side_banner_primary?: string;

  @ApiProperty({
    example: 'https://example.com/side_banner_secondary.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  side_banner_secondary?: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  telephone: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsString()
  @IsOptional()
  fax?: string;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  @IsNotEmpty()
  address_primary: string;

  @ApiProperty({ example: '456 Second St', required: false })
  @IsString()
  @IsOptional()
  address_secondary?: string;

  @ApiProperty({ example: 'A brief description of the store', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'My Store Title' })
  @IsString()
  @IsNotEmpty()
  meta_title: string;

  @ApiProperty({ example: 'A brief meta description of the store' })
  @IsString()
  @IsOptional()
  meta_description?: string;

  @ApiProperty({ example: 'my-store-slug' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Schema markup data', required: false })
  @IsString()
  @IsOptional()
  schema_markup?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ example: 'UUID of the country' })
  @IsUUID()
  @IsNotEmpty()
  country_id: string;

  @ApiProperty({ example: 'UUID of the state' })
  @IsUUID()
  @IsNotEmpty()
  state_id: string;

  @ApiProperty({ example: 'UUID of the city' })
  @IsUUID()
  @IsNotEmpty()
  city_id: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  zip: string;

  @ApiProperty({ type: StorePaypalDetailDto })
  @ValidateNested()
  @Type(() => StorePaypalDetailDto)
  store_paypal_detail: StorePaypalDetailDto;

  @ApiProperty({ type: StoreSocialMediaDto })
  @ValidateNested()
  @Type(() => StoreSocialMediaDto)
  store_social_media: StoreSocialMediaDto;

  @ApiProperty({ type: StoreCardPaymentDetailDto })
  @ValidateNested()
  @Type(() => StoreCardPaymentDetailDto)
  store_card_payment: StoreCardPaymentDetailDto;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  sort?: number;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  dropship?: boolean;

  @ApiProperty({ example: 1234567890, required: false })
  @IsString()
  @IsOptional()
  invoice_serial_number?: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'password must be 8 characters long' })
  password: string;
}
