import { HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateService } from 'src/paginate/paginate.service';

import { Gender, Prisma, Role, Store, Title } from '@prisma/client';
import { Page } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateStoreDto, UpdateStoreDto } from '../store/dto';

import { getDefaultStoreMedia, generateSlug } from 'src/common/utils';

import { AppError } from 'src/errors';

import * as argon from 'argon2';
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
        meta_title: {
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
        meta_title: true,
        description: true,
        slug: true,
        vat_number: true,
        registration_number: true,
        logo: true,
        icon_primary: true,
        icon_secondary: true,
        banner_primary: true,
        banner_secondary: true,
        side_banner_primary: true,
        side_banner_secondary: true,
        telephone: true,
        fax: true,
        address_primary: true,
        address_secondary: true,
        is_active: true,
        zip: true,
        schema_markup: true,
        sort: true,
        invoice_serial_number: true,
        meta_description: true,
        minimum_order: true,
        store_name: true,
        spermalink: true,
        created_at: true,
        updated_at: true,
        rent_per_month: true,
        commission_percentage: true,
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
        store_paypal_detail: {
          select: {
            id: true,
            store_paypal_email: true,
            store_paypal_api_username: true,
            store_paypal_api_password: true,
            store_paypal_api_signature: true,
            created_at: true,
            updated_at: true,
          },
        },
        store_card_payment: {
          select: {
            id: true,
            title: true,
            detail: true,
            created_at: true,
            updated_at: true,
          },
        },
        city_id: true,
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
        state_id: true,
        store_card_payment_id: true,
        store_paypal_detail_id: true,
        store_social_media_id: true,
        country_id: true,
        dropship: true,
        owner_id: true,
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
        meta_title: true,
        description: true,
        slug: true,
        vat_number: true,
        registration_number: true,
        logo: true,
        icon_primary: true,
        icon_secondary: true,
        banner_primary: true,
        banner_secondary: true,
        side_banner_primary: true,
        side_banner_secondary: true,
        telephone: true,
        fax: true,
        address_primary: true,
        address_secondary: true,
        is_active: true,
        zip: true,
        schema_markup: true,
        sort: true,
        invoice_serial_number: true,
        meta_description: true,
        minimum_order: true,
        store_name: true,
        spermalink: true,
        created_at: true,
        updated_at: true,
        rent_per_month: true,
        commission_percentage: true,
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

        store_paypal_detail: {
          select: {
            id: true,
            store_paypal_email: true,
            store_paypal_api_username: true,
            store_paypal_api_password: true,
            store_paypal_api_signature: true,
            created_at: true,
            updated_at: true,
          },
        },
        store_card_payment: {
          select: {
            id: true,
            title: true,
            detail: true,
            created_at: true,
            updated_at: true,
          },
        },
        city_id: true,
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
        state_id: true,
        store_card_payment_id: true,
        store_paypal_detail_id: true,
        store_social_media_id: true,
        country_id: true,
        dropship: true,
        owner_id: true,
      },
    });
  }

  public async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    try {
      // Check if the user already exists
      const user = await this.prismaService.user.findUnique({
        where: {
          id: createStoreDto.email,
        },
        select: {
          id: true,
          role: true,
        },
      });

      if (user) {
        throw new AppError('Store owner already exists', HttpStatus.FORBIDDEN);
      }

      // Check if the city exists
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

      // Generate slug
      const slug = generateSlug(createStoreDto.meta_title);

      // Check if a store with the same details already exists
      const alreadyExists = await this.prismaService.store.findFirst({
        where: {
          OR: [
            { meta_title: createStoreDto.meta_title },
            { vat_number: createStoreDto.vat_number },
            { registration_number: createStoreDto.registration_number },
            { slug },
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

      // Encrypt password
      const encPassword = await argon.hash(createStoreDto.password);

      // Create the store
      const store = await this.prismaService.store.create({
        data: {
          meta_title: createStoreDto.meta_title,
          description: createStoreDto.description,
          meta_description: createStoreDto.meta_description,
          store_name: createStoreDto.store_name,
          spermalink: createStoreDto.spermalink,
          schema_markup: createStoreDto.schema_markup,
          invoice_serial_number: createStoreDto.invoice_serial_number,
          slug: createStoreDto.slug,
          vat_number: createStoreDto.vat_number,
          registration_number: createStoreDto.registration_number,
          logo: createStoreDto.logo,
          icon_primary: createStoreDto.icon_primary,
          icon_secondary: createStoreDto.icon_secondary,
          banner_primary: createStoreDto.banner_primary,
          banner_secondary: createStoreDto.banner_secondary,
          side_banner_primary: createStoreDto.side_banner_primary,
          side_banner_secondary: createStoreDto.side_banner_secondary,
          telephone: createStoreDto.telephone,
          fax: createStoreDto.fax,
          address_primary: createStoreDto.address_primary,
          address_secondary: createStoreDto.address_secondary,
          zip: createStoreDto.zip,
          owner: {
            create: {
              email: createStoreDto.email,
              password: encPassword,
              first_name: 'Store',
              last_name: 'Owner',
              role: Role.STORE_OWNER,
              dob: new Date(),
              is_active: true,
              title: Title.MR,
              gender: Gender.MALE,
              city: {
                connect: {
                  id: city.id,
                },
              },
              user_access_rights: {
                create: {
                  category_module: false,
                  product_module: true,
                  attribute_module: true,
                  cms_module: true,
                  newsletter_module: true,
                },
              },
            },
          },
          country: {
            connect: {
              id: createStoreDto.country_id,
            },
          },
          state: {
            connect: {
              id: createStoreDto.state_id,
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
              store_pinterest:
                createStoreDto.store_social_media.store_pinterest,
            },
          },
          store_card_payment: {
            create: {
              title: createStoreDto.store_card_payment.title,
              detail: createStoreDto.store_card_payment.detail,
            },
          },
        },
        select: {
          id: true,
          meta_title: true,
          description: true,
          slug: true,
          vat_number: true,
          registration_number: true,
          logo: true,
          icon_primary: true,
          icon_secondary: true,
          banner_primary: true,
          banner_secondary: true,
          side_banner_primary: true,
          side_banner_secondary: true,
          telephone: true,
          fax: true,
          address_primary: true,
          address_secondary: true,
          is_active: true,
          zip: true,
          schema_markup: true,
          sort: true,
          invoice_serial_number: true,
          meta_description: true,
          minimum_order: true,
          store_name: true,
          spermalink: true,
          created_at: true,
          updated_at: true,
          rent_per_month: true,
          commission_percentage: true,
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
          store_paypal_detail: {
            select: {
              id: true,
              store_paypal_email: true,
              store_paypal_api_username: true,
              store_paypal_api_password: true,
              store_paypal_api_signature: true,
              created_at: true,
              updated_at: true,
            },
          },
          store_card_payment: {
            select: {
              id: true,
              title: true,
              detail: true,
              created_at: true,
              updated_at: true,
            },
          },
          city_id: true,
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
          state_id: true,
          store_card_payment_id: true,
          store_paypal_detail_id: true,
          store_social_media_id: true,
          country_id: true,
          dropship: true,
          owner_id: true,
        },
      });

      return store;
    } catch (error) {
      console.error('Error creating store:', error);
      throw new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateStore(
    id: string,
    updateStoreDto: UpdateStoreDto,
  ): Promise<Store> {
    try {
      // Check if the store exists
      const store = await this.prismaService.store.findUnique({
        where: { id },
      });

      if (!store) {
        throw new AppError('Store not found', HttpStatus.NOT_FOUND);
      }

      // Check if the city exists
      if (updateStoreDto.city_id) {
        const city = await this.prismaService.city.findUnique({
          where: { id: updateStoreDto.city_id },
        });

        if (!city) {
          throw new AppError('City does not exist', HttpStatus.FORBIDDEN);
        }
      }

      // Check if the slug needs to be updated
      if (updateStoreDto.meta_title) {
        const slug = generateSlug(updateStoreDto.meta_title);
        updateStoreDto.slug = slug;
      }

      // Update the store
      const updatedStore = await this.prismaService.store.update({
        where: { id },
        data: {
          city: updateStoreDto.city_id
            ? { connect: { id: updateStoreDto.city_id } }
            : undefined,
          country: updateStoreDto.country_id
            ? { connect: { id: updateStoreDto.country_id } }
            : undefined,
          state: updateStoreDto.state_id
            ? { connect: { id: updateStoreDto.state_id } }
            : undefined,
          store_paypal_detail: {
            update: {
              ...updateStoreDto.store_paypal_detail,
            },
          },
          store_social_media: {
            update: {
              ...updateStoreDto.store_social_media,
            },
          },
          store_card_payment: {
            update: {
              ...updateStoreDto.store_card_payment,
            },
          },
          meta_description: updateStoreDto.meta_description,
          meta_title: updateStoreDto.meta_title,
          description: updateStoreDto.description,
          store_name: updateStoreDto.store_name,
          spermalink: updateStoreDto.spermalink,
          vat_number: updateStoreDto.vat_number,
          registration_number: updateStoreDto.registration_number,
          logo: updateStoreDto.logo,
          icon_primary: updateStoreDto.icon_primary,
          icon_secondary: updateStoreDto.icon_secondary,
          banner_primary: updateStoreDto.banner_primary,
          banner_secondary: updateStoreDto.banner_secondary,
          side_banner_primary: updateStoreDto.side_banner_primary,
          side_banner_secondary: updateStoreDto.side_banner_secondary,
          telephone: updateStoreDto.telephone,
          fax: updateStoreDto.fax,
          address_primary: updateStoreDto.address_primary,
          address_secondary: updateStoreDto.address_secondary,
          zip: updateStoreDto.zip,
          invoice_serial_number: updateStoreDto.invoice_serial_number,
          sort: updateStoreDto.sort,
          minimum_order: updateStoreDto.minimum_order,
          is_active: updateStoreDto.is_active,
          rent_per_month: updateStoreDto.rent_per_month,
          commission_percentage: updateStoreDto.commission_percentage,
          dropship: updateStoreDto.dropship,
        },
        select: {
          id: true,
          meta_title: true,
          description: true,
          slug: true,
          vat_number: true,
          registration_number: true,
          logo: true,
          icon_primary: true,
          icon_secondary: true,
          banner_primary: true,
          banner_secondary: true,
          side_banner_primary: true,
          side_banner_secondary: true,
          telephone: true,
          fax: true,
          address_primary: true,
          address_secondary: true,
          is_active: true,
          zip: true,
          schema_markup: true,
          sort: true,
          invoice_serial_number: true,
          meta_description: true,
          minimum_order: true,
          store_name: true,
          spermalink: true,
          created_at: true,
          updated_at: true,
          rent_per_month: true,
          commission_percentage: true,
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
          store_paypal_detail: {
            select: {
              id: true,
              store_paypal_email: true,
              store_paypal_api_username: true,
              store_paypal_api_password: true,
              store_paypal_api_signature: true,
              created_at: true,
              updated_at: true,
            },
          },
          store_card_payment: {
            select: {
              id: true,
              title: true,
              detail: true,
              created_at: true,
              updated_at: true,
            },
          },
          city_id: true,
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
          state_id: true,
          store_card_payment_id: true,
          store_paypal_detail_id: true,
          store_social_media_id: true,
          country_id: true,
          dropship: true,
          owner_id: true,
        },
      });

      return updatedStore;
    } catch (error) {
      console.error('Error updating store:', error);
      throw new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteStore(id: string): Promise<Store> {
    return await this.prismaService.store.delete({
      where: {
        id,
      },
    });
  }
}
