import { HttpStatus, Injectable } from '@nestjs/common';

import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateService } from 'src/paginate/paginate.service';

import { Prisma } from '@prisma/client';
import { Page, StoreOwner, UserTitle, UserGender } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateStoreOwnerDTO } from './dto';

import { AppError } from 'src/errors';

@Injectable()
export class StoreOwnerService {
  constructor(
    private prismaService: PrismaService,
    private paginateService: PaginateService,
  ) {}

  public async getAllStoreOwners(
    pageOptionsDto: PageOptionsDTO,
  ): Promise<Page<StoreOwner>> {
    const { skip, take, order } = pageOptionsDto;
    const search = pageOptionsDto?.search?.trim() || '';

    const whereClauseArr: Prisma.UserWhereInput[] = [
      {
        first_name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        middle_name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        last_name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        email: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        telephone: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ];

    const storeOwners = await this.prismaService.user.findMany({
      where: {
        role: 'STORE_OWNER',
        OR: whereClauseArr,
      },
      skip,
      take,
      orderBy: {
        created_at: order,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        middle_name: true,
        role: true,
        dob: true,
        is_active: true,
        title: true,
        gender: true,
        telephone: true,
        image_uri: true,
        created_at: true,
        updated_at: true,
        city: {
          select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
            country: {
              select: {
                id: true,
                name: true,
                short_code: true,
                code: true,
                created_at: true,
                updated_at: true,
              },
            },
            state: {
              select: {
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
              },
            },
          },
        },
        user_access_rights: true,
      },
    });

    const storeOwnersByWhereClause = await this.prismaService.user.count({
      where: {
        role: 'STORE_OWNER',
        OR: whereClauseArr,
      },
    });

    return await this.paginateService.paginate<StoreOwner>(
      storeOwners as StoreOwner[],
      storeOwnersByWhereClause,
      pageOptionsDto,
    );
  }

  public async getStoreOwner(id: string): Promise<StoreOwner> {
    return (await this.prismaService.user.findFirstOrThrow({
      where: {
        role: 'STORE_OWNER',
        id,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        middle_name: true,
        role: true,
        dob: true,
        is_active: true,
        title: true,
        gender: true,
        telephone: true,
        image_uri: true,
        created_at: true,
        updated_at: true,
        city: {
          select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
            country: {
              select: {
                id: true,
                name: true,
                short_code: true,
                code: true,
                created_at: true,
                updated_at: true,
              },
            },
            state: {
              select: {
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
              },
            },
          },
        },
        user_access_rights: true,
      },
    })) as StoreOwner;
  }

  public async createStoreOwner(
    createStoreOwnerDto: CreateStoreOwnerDTO,
  ): Promise<StoreOwner> {
    const alreadyExists = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            email: createStoreOwnerDto.email,
          },
          {
            telephone: createStoreOwnerDto.telephone,
          },
        ],
      },
    });

    if (alreadyExists) {
      throw new AppError(
        'Store Owner with same details already exists',
        HttpStatus.FORBIDDEN,
      );
    }

    const hash = await argon.hash(createStoreOwnerDto.password);

    return (await this.prismaService.user.create({
      data: {
        email: createStoreOwnerDto.email,
        password: hash,
        first_name: createStoreOwnerDto.first_name,
        middle_name: createStoreOwnerDto.middle_name,
        last_name: createStoreOwnerDto.last_name,
        role: 'STORE_OWNER',
        dob: createStoreOwnerDto.dob,
        title: createStoreOwnerDto.title as UserTitle,
        gender: createStoreOwnerDto.gender as UserGender,
        telephone: createStoreOwnerDto.telephone,
        user_access_rights: {
          create: {},
        },
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        role: true,
        dob: true,
        is_active: true,
        title: true,
        gender: true,
        telephone: true,
        image_uri: true,
        created_at: true,
        updated_at: true,
        city: {
          select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
            country: {
              select: {
                id: true,
                name: true,
                short_code: true,
                code: true,
                created_at: true,
                updated_at: true,
              },
            },
            state: {
              select: {
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
              },
            },
          },
        },
        user_access_rights: true,
      },
    })) as StoreOwner;
  }

  public async deleteStoreOwner(id: string): Promise<StoreOwner> {
    return (await this.prismaService.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        role: true,
        dob: true,
        is_active: true,
        title: true,
        gender: true,
        telephone: true,
        image_uri: true,
        created_at: true,
        updated_at: true,
        city: {
          select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
            country: {
              select: {
                id: true,
                name: true,
                short_code: true,
                code: true,
                created_at: true,
                updated_at: true,
              },
            },
            state: {
              select: {
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
              },
            },
          },
        },
        user_access_rights: true,
      },
    })) as StoreOwner;
  }
}
