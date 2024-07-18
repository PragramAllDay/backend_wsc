import { PageOrder } from 'src/enums';

export type PageOptions = {
  skip: number;
  take: number;
  order: PageOrder;
};

export type PageMeta = PageOptions & {
  page: number;
  pages: number;
  has_prev: boolean;
  has_next: boolean;
};

export type Page<T> = {
  meta: PageMeta;
  data: T[];
};
