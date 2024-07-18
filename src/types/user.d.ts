import { UserRole } from './user_role';
import { Country } from './country';
import { City } from './city';
import { AccessRights } from './user_right';

export type UserRes = {
  id: string;

  email: string;

  first_name: string;
  middle_name: string | null;
  last_name: string;

  role: UserRole;

  dob: DateTime;

  is_active: boolean;

  title: UserTitle;
  gender: UserGender;
  telephone: string | null;

  image_uri: string | null;

  created_at: DateTime;
  updated_at: DateTime | null;

  city: City;

  user_access_rights: AccessRights;
};

export type UserTitle = 'MR' | 'MS' | 'MRS' | 'MISS' | 'MASTER' | 'MADAM';
export type UserGender = 'MALE' | 'FEMALE' | 'RATHER_NOT_SAY';
