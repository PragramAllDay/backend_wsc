import { Country } from './country';

export type City = {
  id: string;

  name: string;

  country: Country;
  state: {
    id: string;
    name: string;
    created_at: DateTime;
    updated_at: DateTime | null;
  };

  created_at: DateTime;
  updated_at: DateTime | null;
};
