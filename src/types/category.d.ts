export type Category = {
  id: string;

  title: string;
  sub_title: string;
  description: string;
  slug: string;

  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  schema_markup: string | null;

  is_active: boolean;

  image_primary: string;
  image_secondary: string | null;

  icon_primary: string;
  icon_secondary: string | null;

  is_featured: boolean;

  parent: {
    id: string;

    tilte: string;
    sub_title: string;
    slug: string;

    is_active: boolean;

    image_primary: string;
    image_secondary: string | null;

    icon_primary: string;
    icon_secondary: string | null;

    is_featured: boolean;

    created_at: DateTime;
    updated_at: DateTime | null;
  };

  created_at: DateTime;
  updated_at: DateTime | null;
};
