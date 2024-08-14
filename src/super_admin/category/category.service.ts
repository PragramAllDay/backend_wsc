import { HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';

import { Category, Prisma } from '@prisma/client';
import { Page } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
// import { CreateCountryDTO } from './dto';

import { AppError } from 'src/errors';
import {
  CreateCategoryDto,
  SortCategoriesDto,
} from './dto/create-category.dto';
import { generateSlug } from 'src/common/utils';

@Injectable()
export class CategoryService {
  constructor(
    private prismaService: PrismaService,
    private responseService: ResponseService,
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

      const updateCategory = await this.prismaService.category.create({
        data: categoryData,
      });
      return this.responseService.sendResponse(
        HttpStatus.CREATED,
        'Success',
        updateCategory,
      );
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async getCategoryById(id: string) {
    try {
      const category = await this.prismaService.category.findUnique({
        where: { id },
      });
      if (!category) {
        throw new AppError('Category not found', HttpStatus.NOT_FOUND);
      }
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        category,
      );
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }
  async updateCategory(id: string, data: Prisma.CategoryUpdateInput) {
    try {
      const category = await this.prismaService.category.findUnique({
        where: { id },
      });
      if (!category) {
        throw new AppError('Category not found', HttpStatus.NOT_FOUND);
      }
      const updateCategory = await this.prismaService.category.update({
        where: { id },
        data,
      });
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        updateCategory,
      );
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async deleteCategory(id: string) {
    try {
      const category = await this.prismaService.category.findUnique({
        where: { id },
      });
      if (!category) {
        throw new AppError('Category not found', HttpStatus.NOT_FOUND);
      }
      await this.prismaService.category.delete({
        where: { id },
      });

      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success deleted',
        {},
      );
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  async getAllCategories() {
    try {
      const categories = await this.prismaService.category.findMany({
        include: {
          parent: {
            include: {
              parent: true,
            },
          },
        },
      });
      categories.forEach((item) => {
        if (item.parent) {
          item.title = item.parent.parent
            ? `${item.parent.parent.title} >> ${item.parent.title} >> ${item.title}`
            : `${item.parent.title} >> ${item.title}`;
        }
      });
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        categories,
      );
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async findAllParentCategories() {
    try {
      const categories = await this.prismaService.category.findMany({
        where: {
          parent_id: null,
        },
        select: {
          id: true,
          title: true,
          sub_title: true,
          sort_order: true,
        },
      });
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        categories,
      );
    } catch (error) {
      console.error('Error fetching parent categories:', error);
      throw error;
    }
  }

  async sortCategories(sortCategoriesDto: SortCategoriesDto) {
    try {
      const { categoryIds } = sortCategoriesDto;

      for (let i = 0; i < categoryIds.length; i++) {
        const id = categoryIds[i];
        await this.prismaService.category.update({
          where: { id },
          data: { sort_order: i + 1 },
        });
      }

      return this.responseService.sendResponse(HttpStatus.OK, 'Success', {});
    } catch (error) {
      console.error('Error sorting categories:', error);
      throw error;
    }
  }
}
