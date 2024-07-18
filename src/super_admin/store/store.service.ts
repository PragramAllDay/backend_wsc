import { HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateService } from 'src/paginate/paginate.service';

import { Prisma } from '@prisma/client';
import { Page, Store } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateStoreDTO } from '../store/dto';

import { getDefaultStoreMedia, generateSlug } from 'src/common/utils';

import { AppError } from 'src/errors';

@Injectable()
export class StoreService {
  constructor(
    private prismaService: PrismaService,
    private paginateService: PaginateService,
  ) {}

  public async getAllStores(
    pageOptionsDto: PageOptionsDTO,
  ): Promise<Page<Store>> {
    const { skip, take, order } = pageOptionsDto;
    const search = pageOptionsDto?.search?.trim() || '';

    const whereClauseArr: Prisma.StoreWhereInput[] = [
      {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        vat_number: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        registration_number: {
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
      {
        fax: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ];

    const stores = await this.prismaService.store.findMany({
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
        title: true,
        description: true,
        slug: true,
        vat_number: true,
        registration_number: true,
        logo_primary: true,
        logo_secondary: true,
        icon_primary: true,
        icon_secondary: true,
        banner_primary: true,
        banner_secondary: true,
        side_banner_primary: true,
        side_banner_Secondary: true,
        telephone: true,
        fax: true,
        address_primary: true,
        address_secondary: true,
        is_active: true,
        zip: true,
        created_at: true,
        updated_at: true,
        owner: {
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
          },
        },
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
        store_social_media: {
          select: {
            id: true,
            store_facebook: true,
            store_twitter: true,
            store_google_plus: true,
            store_pinterest: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });

    const storesCountByWhereClause = await this.prismaService.store.count({
      where: {
        OR: whereClauseArr,
      },
    });

    return await this.paginateService.paginate<Store>(
      stores,
      storesCountByWhereClause,
      pageOptionsDto,
    );
  }

  public async getStore(id: string): Promise<Store> {
    return await this.prismaService.store.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        vat_number: true,
        registration_number: true,
        logo_primary: true,
        logo_secondary: true,
        icon_primary: true,
        icon_secondary: true,
        banner_primary: true,
        banner_secondary: true,
        side_banner_primary: true,
        side_banner_Secondary: true,
        telephone: true,
        fax: true,
        address_primary: true,
        address_secondary: true,
        is_active: true,
        zip: true,
        created_at: true,
        updated_at: true,
        owner: {
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
          },
        },
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
        store_social_media: {
          select: {
            id: true,
            store_facebook: true,
            store_twitter: true,
            store_google_plus: true,
            store_pinterest: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });
  }

  public async createStore(createStoreDto: CreateStoreDTO): Promise<Store> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: createStoreDto.owner_id,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      throw new AppError('User does not exits', HttpStatus.FORBIDDEN);
    }

    if (user.role !== 'STORE_OWNER') {
      throw new AppError('User is not a store owner', HttpStatus.FORBIDDEN);
    }

    const city = await this.prismaService.city.findUnique({
      where: {
        id: createStoreDto.city_id,
      },
      select: {
        id: true,
      },
    });

    if (!city) {
      throw new AppError('City does not exist', HttpStatus.FORBIDDEN);
    }

    const slug = generateSlug(createStoreDto.title);

    const alreadyExists = await this.prismaService.store.findFirst({
      where: {
        OR: [
          {
            title: createStoreDto.title,
          },
          {
            vat_number: createStoreDto.vat_number,
          },
          {
            registration_number: createStoreDto.registration_number,
          },
          {
            slug,
          },
        ],
      },
      select: {
        id: true,
      },
    });

    if (alreadyExists) {
      throw new AppError(
        'Store with same details already exists',
        HttpStatus.FORBIDDEN,
      );
    }

    const { logo_primary, icon_primary, banner_primary } =
      getDefaultStoreMedia();

    return await this.prismaService.store.create({
      data: {
        title: createStoreDto.title,
        description: createStoreDto.description,
        slug,
        vat_number: createStoreDto.vat_number,
        registration_number: createStoreDto.registration_number,
        logo_primary,
        logo_secondary: null,
        icon_primary,
        icon_secondary: null,
        banner_primary,
        banner_secondary: null,
        side_banner_primary: null,
        side_banner_Secondary: null,
        telephone: createStoreDto.telephone,
        fax: createStoreDto.fax,
        address_primary: createStoreDto.address_primary,
        address_secondary: createStoreDto.address_secondary,
        zip: createStoreDto.zip,
        owner: {
          connect: {
            id: createStoreDto.owner_id,
          },
        },
        city: {
          connect: {
            id: createStoreDto.city_id,
          },
        },
        store_paypal_detail: {
          create: {
            store_paypal_email:
              createStoreDto.store_paypal_detail.store_paypal_email,
            store_paypal_api_username:
              createStoreDto.store_paypal_detail.store_paypal_api_username,
            store_paypal_api_password:
              createStoreDto.store_paypal_detail.store_paypal_api_password,
            store_paypal_api_signature:
              createStoreDto.store_paypal_detail.store_paypal_api_signature,
          },
        },
        store_social_media: {
          create: {
            store_facebook: createStoreDto.store_social_media.store_facebook,
            store_twitter: createStoreDto.store_social_media.store_twitter,
            store_google_plus:
              createStoreDto.store_social_media.store_google_plus,
            store_pinterest: createStoreDto.store_social_media.store_pintrest,
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        vat_number: true,
        registration_number: true,
        logo_primary: true,
        logo_secondary: true,
        icon_primary: true,
        icon_secondary: true,
        banner_primary: true,
        banner_secondary: true,
        side_banner_primary: true,
        side_banner_Secondary: true,
        telephone: true,
        fax: true,
        address_primary: true,
        address_secondary: true,
        is_active: true,
        zip: true,
        created_at: true,
        updated_at: true,
        owner: {
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
          },
        },
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
        store_social_media: {
          select: {
            id: true,
            store_facebook: true,
            store_twitter: true,
            store_google_plus: true,
            store_pinterest: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });
  }

  public async deleteStore(id: string): Promise<Store> {
    return await this.prismaService.store.delete({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        vat_number: true,
        registration_number: true,
        logo_primary: true,
        logo_secondary: true,
        icon_primary: true,
        icon_secondary: true,
        banner_primary: true,
        banner_secondary: true,
        side_banner_primary: true,
        side_banner_Secondary: true,
        telephone: true,
        fax: true,
        address_primary: true,
        address_secondary: true,
        is_active: true,
        zip: true,
        created_at: true,
        updated_at: true,
        owner: {
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
          },
        },
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
        store_social_media: {
          select: {
            id: true,
            store_facebook: true,
            store_twitter: true,
            store_google_plus: true,
            store_pinterest: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });
  }
}
