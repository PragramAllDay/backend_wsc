import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';

import { SuperAdminController } from '../super_admin.controller';

import { CategoryService } from './category.service';

import { Page } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { Prisma } from '@prisma/client';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto/create-category.dto';

@Controller()
export class CategoryController extends SuperAdminController {
  constructor(private categoryService: CategoryService) {
    super();
  }
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.categoryService.getAllCategories();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
  // @HttpCode(HttpStatus.OK)
  // @Get()
  // public async getAllCategories(
  //   @Query() pageOptionsDTO: PageOptionsDTO,
  // ): Promise<Page<str>> {
  //   return this.categoryService.getAllCategories(pageOptionsDTO);
  // }
}
