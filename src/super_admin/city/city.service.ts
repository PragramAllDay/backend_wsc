import { HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateService } from 'src/paginate/paginate.service';

import { Prisma } from '@prisma/client';
import { Page, City } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateCityDTO } from './dto';

import { AppError } from 'src/errors';

@Injectable()
export class CityService {
  constructor(
    private prismaService: PrismaService,
    private paginateService: PaginateService,
  ) {}

  public async getAllCities(
    pageOptionsDto: PageOptionsDTO,
  ): Promise<Page<City>> {
    const { skip, take, order } = pageOptionsDto;
    const search = pageOptionsDto?.search?.trim() || '';

    const whereClauseArr: Prisma.CityWhereInput[] = [
      {
        name: {
          contains: search,
          mode: 'insensitive',
        },
        country: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        state: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      },
    ];

    const cities = await this.prismaService.city.findMany({
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
        country: true,
        state: true,
        created_at: true,
        updated_at: true,
      },
    });

    const citiesCountByWhereClause = await this.prismaService.city.count({
      where: {
        OR: whereClauseArr,
      },
    });

    return await this.paginateService.paginate<City>(
      cities,
      citiesCountByWhereClause,
      pageOptionsDto,
    );
  }

  public async getCity(id: string): Promise<City> {
    return await this.prismaService.city.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        country: true,
        state: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  public async createCity(createCityDto: CreateCityDTO): Promise<City> {
    const country = await this.prismaService.country.findUnique({
      where: {
        id: createCityDto.country_id,
      },
      select: {
        id: true,
      },
    });

    if (!country) {
      throw new AppError('Country not found', HttpStatus.NOT_FOUND);
    }

    const state = await this.prismaService.state.findUnique({
      where: {
        id: createCityDto.state_id,
      },
      select: {
        id: true,
      },
    });

    if (!state) {
      throw new AppError('State not found', HttpStatus.NOT_FOUND);
    }

    // Check if already exists
    const alreadyExists = await this.prismaService.city.findFirst({
      where: {
        name: createCityDto.name,
        country: {
          id: createCityDto.country_id,
        },
        state: {
          id: createCityDto.state_id,
        },
      },
      select: {
        id: true,
      },
    });

    if (alreadyExists) {
      throw new AppError('City already exists', HttpStatus.FORBIDDEN);
    }

    return await this.prismaService.city.create({
      data: {
        name: createCityDto.name,
        country: {
          connect: {
            id: createCityDto.country_id,
          },
        },
        state: {
          connect: {
            id: createCityDto.state_id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        country: true,
        state: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  public async deleteCity(id: string): Promise<City> {
    return this.prismaService.city.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        country: true,
        state: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}
