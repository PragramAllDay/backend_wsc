import { Injectable, HttpStatus } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateService } from 'src/paginate/paginate.service';

import { Prisma } from '@prisma/client';
import { Page, Country } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateCountryDTO } from './dto';

import { AppError } from 'src/errors';

@Injectable()
export class CountryService {
  constructor(
    private prismaService: PrismaService,
    private paginateService: PaginateService,
  ) {}

  public async getAllCountries(
    pageOptionsDto: PageOptionsDTO,
  ): Promise<Page<Country>> {
    const { skip, take, order } = pageOptionsDto;
    const search = pageOptionsDto?.search?.trim() || '';

    const whereClauseArr: Prisma.CountryWhereInput[] = [
      {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        short_code: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        code: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ];

    const countries = await this.prismaService.country.findMany({
      where: {
        OR: whereClauseArr,
      },
      skip,
      take,
      orderBy: {
        created_at: order,
      },
      select: {
        id: true,
        name: true,
        short_code: true,
        code: true,
        created_at: true,
        updated_at: true,
      },
    });

    const countriesCountByWhereClause = await this.prismaService.country.count({
      where: {
        OR: whereClauseArr,
      },
    });

    return await this.paginateService.paginate<Country>(
      countries,
      countriesCountByWhereClause,
      pageOptionsDto,
    );
  }

  public async getCountry(id: string): Promise<Country> {
    return await this.prismaService.country.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        short_code: true,
        code: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  public async createCountry(
    createCountryDto: CreateCountryDTO,
  ): Promise<Country> {
    const alreadyExists = await this.prismaService.country.findFirst({
      where: {
        name: createCountryDto.name,
        short_code: createCountryDto.short_code,
        code: createCountryDto.code,
      },
      select: {
        id: true,
      },
    });

    if (alreadyExists) {
      throw new AppError('Country already exists', HttpStatus.FORBIDDEN);
    }

    return await this.prismaService.country.create({
      data: {
        name: createCountryDto.code,
        short_code: createCountryDto.short_code,
        code: createCountryDto.short_code,
      },
      select: {
        id: true,
        name: true,
        short_code: true,
        code: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  public async deleteCountry(id: string): Promise<Country> {
    return await this.prismaService.country.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        short_code: true,
        code: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}
