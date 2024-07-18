import { UserRes } from './user';
import { City } from './city';

type StoreUserRes = Omit<UserRes, 'city' | 'user_access_rights'>;

export type Store = {
  id: string;

  title: string;
  description: string;
  slug: string;

  vat_number: string;
  registration_number: string;

  logo_primary: string;
  logo_secondary: string;

  icon_primary: string;
  icon_secondary: string;

  banner_primary: string;
  banner_secondary: string;

  side_banner_primary: string;
  side_banner_Secondary: string;

  telephone: string;
  fax: string;

  address_primary: string;
  address_secondary: string;

  is_active: boolean;

  zip: string;

  created_at: DateTime;
  updated_at: DateTime | null;

  owner: StoreUserRes;

  city: City;

  store_social_media: StoreSocialMedia;
};

type StorePaypalDetail = {
  id: string;

  store_paypal_email: string;
  store_paypal_api_username: string;
  store_paypal_api_password: string;
  store_paypal_api_signature: string;

  created_at: DateTime;
  updated_at: DateTime | null;
};

export type StoreSocialMedia = {
  id: string;

  store_facebook: string;
  store_twitter: string;
  store_google_plus: string;
  store_pinterest: string;

  created_at: DateTime;
  updated_at: DateTime | null;
};
