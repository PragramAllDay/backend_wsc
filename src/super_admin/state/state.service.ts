import { Injectable, HttpStatus } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateService } from 'src/paginate/paginate.service';

import { Prisma } from '@prisma/client';
import { Page, State } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateStateDTO } from './dto';

import { AppError } from 'src/errors';

@Injectable()
export class StateService {
  constructor(
    private prismaService: PrismaService,
    private paginateService: PaginateService,
  ) {}

  public async getAllStates(
    pageOptionsDto: PageOptionsDTO,
  ): Promise<Page<State>> {
    const { skip, take, order } = pageOptionsDto;
    const search = pageOptionsDto?.search?.trim() || '';

    const whereClauseArr: Prisma.StateWhereInput[] = [
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
      },
    ];

    const states = await this.prismaService.state.findMany({
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
        created_at: true,
        updated_at: true,
      },
    });

    const statesCountByWhereClause = await this.prismaService.state.count({
      where: {
        OR: whereClauseArr,
      },
    });

    return await this.paginateService.paginate<State>(
      states,
      statesCountByWhereClause,
      pageOptionsDto,
    );
  }

  public async getState(id: string): Promise<State> {
    return await this.prismaService.state.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        country: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  public async createState(createStateDto: CreateStateDTO): Promise<State> {
    const country = await this.prismaService.country.findUnique({
      where: {
        id: createStateDto.country_id,
      },
      select: {
        id: true,
      },
    });

    if (!country) {
      throw new AppError('Country not found', HttpStatus.NOT_FOUND);
    }

    const alreadyExists = await this.prismaService.state.findFirst({
      where: {
        name: createStateDto.name,
        country: {
          id: createStateDto.country_id,
        },
      },
      select: {
        id: true,
      },
    });

    if (alreadyExists) {
      throw new AppError('State already exists', HttpStatus.FORBIDDEN);
    }

    return await this.prismaService.state.create({
      data: {
        name: createStateDto.name,
        country: {
          connect: {
            id: createStateDto.country_id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        country: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  public async deleteState(id: string): Promise<State> {
    return this.prismaService.state.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        country: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}
