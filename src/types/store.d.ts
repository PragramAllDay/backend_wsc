import { UserRes } from './user';
import { City } from './city';

type StoreUserRes = Omit<UserRes, 'city' | 'user_access_rights'>;

export type Store = {
  id: string;
  store_name: string;
  spermalink: string;
  rent_per_month: number;
  minimum_order: number;
  commission_percentage: number;
  vat_number: string;
  registration_number: string;

  // logos
  logo: string;
  icon_primary: string;
  icon_secondary?: string;
  banner_primary: string;
  banner_secondary?: string;
  side_banner_primary?: string;
  side_banner_secondary?: string;

  telephone: string;
  fax: string;
  address_primary: string;
  address_secondary?: string;

  description?: string;
  meta_title: string;
  meta_description: string;
  slug: string;
  schema_markup: string;

  is_active: boolean;
  created_at: Date;
  updated_at: Date | null;

  country_id: string;
  state_id: string;
  city_id: string;
  zip: string;

  owner_id: string;
  store_paypal_detail_id: string;
  store_social_media_id: string;
  store_card_payment_id: string;

  sort: number;
  dropship: boolean;
  invoice_serial_number?: string;

  // relations
  owner: StoreUserRes;
  city: City;
  store_social_media: StoreSocialMedia;
  store_paypal_detail: StorePaypalDetail;
  store_card_payment: StoreCardPaymentDetail;
};

export type StoreSocialMedia = {
  id: string;
  store_facebook: string;
  store_twitter: string;
  store_google_plus: string;
  store_pinterest: string;
  created_at: Date;
  updated_at: Date;
};

export type StorePaypalDetail = {
  id: string;
  store_paypal_email: string;
  store_paypal_api_username: string;
  store_paypal_api_password: string;
  store_paypal_api_signature: string;
  created_at: Date;
  updated_at: Date;
};

export type StoreCardPaymentDetail = {
  id: string;
  title: string;
  detail: any;
  created_at: Date;
  updated_at: Date;
};
