import { Injectable } from '@nestjs/common';

import { Page, PageMeta } from '@types';

import { PageOptionsDTO } from 'src/common/dto';

@Injectable()
export class PaginateService {
  constructor() {}

  async paginate<T>(
    filteredData: T[],
    allDataCount: number,
    options: PageOptionsDTO,
  ): Promise<Page<T>> {
    const { skip, take, order } = options;

    const page = Math.floor(skip / take) + 1;
    const totalPages = Math.ceil(allDataCount / take);

    const meta: PageMeta = {
      page,
      skip,
      take,
      order,
      pages: totalPages,
      has_prev: page > 1,
      has_next: page < totalPages,
    };

    return {
      meta,
      data: filteredData,
    };
  }
}
