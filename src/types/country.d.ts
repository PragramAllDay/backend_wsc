export type Country = {
  id: string;

  name: string;
  short_code: string;
  code: string;

  created_at: DateTime;
  updated_at: DateTime | null;
};
