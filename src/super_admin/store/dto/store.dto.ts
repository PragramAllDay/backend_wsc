import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

class StorePaypalDetail {
  @IsNotEmpty()
  @IsEmail()
  store_paypal_email: string;

  @IsNotEmpty()
  @IsString()
  store_paypal_api_username: string;

  @IsNotEmpty()
  @IsString()
  store_paypal_api_password: string;

  @IsNotEmpty()
  @IsString()
  store_paypal_api_signature: string;
}

class StoreSocialMedia {
  @IsNotEmpty()
  @IsString()
  store_facebook: string;

  @IsNotEmpty()
  @IsString()
  store_twitter: string;

  @IsNotEmpty()
  @IsString()
  store_google_plus: string;

  @IsNotEmpty()
  @IsString()
  store_pintrest: string;
}

export class CreateStoreDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  vat_number: string;

  @IsNotEmpty()
  @IsString()
  registration_number: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsString()
  fax: string;

  @IsNotEmpty()
  @IsString()
  address_primary: string;

  @IsNotEmpty()
  @IsString()
  address_secondary: string;

  @IsNotEmpty()
  @IsString()
  zip: string;

  @IsNotEmpty()
  @IsString()
  owner_id: string;

  @IsNotEmpty()
  @IsString()
  city_id: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => StorePaypalDetail)
  store_paypal_detail: StorePaypalDetail;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => StoreSocialMedia)
  store_social_media: StoreSocialMedia;
}
