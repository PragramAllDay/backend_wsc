import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateService } from 'src/paginate/paginate.service';

import { Prisma } from '@prisma/client';
import { Page } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
// import { CreateCountryDTO } from './dto';

import { AppError } from 'src/errors';

@Injectable()
export class CategoryService {
  constructor(
    private prismaService: PrismaService,
    private paginateService: PaginateService,
  ) {}

  public;
}
