import { HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateService } from 'src/paginate/paginate.service';

import { Category, Prisma } from '@prisma/client';
import { Page } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
// import { CreateCountryDTO } from './dto';

import { AppError } from 'src/errors';
import { CreateCategoryDto } from './dto/create-category.dto';
import { generateSlug } from 'src/common/utils';

@Injectable()
export class CategoryService {
  constructor(
    private prismaService: PrismaService,
    private paginateService: PaginateService,
  ) {}

  async createCategory(data: CreateCategoryDto) {
    try {
      const { parent_id, meta_title, ...rest } = data;

      const slug = generateSlug(meta_title);

      // Check if parent_id exists and create relation accordingly
      const categoryData = {
        ...rest,
        slug: slug,
        parent_id: parent_id ? parent_id : null,
      };

      return this.prismaService.category.create({
        data: categoryData,
      });
    } catch (error) {
      console.error('Error creating store:', error);
      throw new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.prismaService.category.findUnique({
      where: { id },
    });
  }

  async updateCategory(
    id: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prismaService.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.prismaService.category.delete({
      where: { id },
    });
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany({
      select: {
        id: true,
        title: true,
        sub_title: true,
        permalink: true,
        meta_title: true,
        meta_description: true,
        meta_keywords: true,
        schema_markup: true,
        image_primary: true,
        image_secondary: true,
        icon_primary: true,
        icon_secondary: true,
        sort_order: true,
        created_at: true,
        updated_at: true,
        is_active: true,
        is_featured: true,
        slug: true,
        description: true,
        parent_id: true,

        parent: {
          select: {
            id: true,
            title: true,
            sub_title: true,
            permalink: true,
            meta_title: true,
            meta_description: true,
            meta_keywords: true,
            schema_markup: true,
            image_primary: true,
            image_secondary: true,
            icon_primary: true,
            icon_secondary: true,
            sort_order: true,
            created_at: true,
            updated_at: true,
            is_active: true,
            is_featured: true,
            slug: true,
            description: true,
            parent_id: true,
            parent: {
              select: {
                id: true,
                title: true,
                sub_title: true,
                permalink: true,
                meta_title: true,
                meta_description: true,
                meta_keywords: true,
                schema_markup: true,
                image_primary: true,
                image_secondary: true,
                icon_primary: true,
                icon_secondary: true,
                sort_order: true,
                created_at: true,
                updated_at: true,
                is_active: true,
                is_featured: true,
                slug: true,
                description: true,
                parent_id: true,
              },
            },
          },
        },
      },
    });

    categories.forEach((item) => {
      if (item.parent) {
        item.title = item.parent.parent
          ? `${item.parent.parent.title} -> ${item.parent.title} -> ${item.title}`
          : `${item.parent.title} -> ${item.title}`;
      }
    });

    return categories;
  }
}
