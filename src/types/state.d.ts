import { Country } from './country';

export type State = {
  id: string;

  name: string;

  country: Country;

  created_at: DateTime;
  updated_at: DateTime | null;
};
