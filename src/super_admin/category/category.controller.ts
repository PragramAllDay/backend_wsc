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
} from '@nestjs/common';

import { SuperAdminController } from '../super_admin.controller';

import { CategoryService } from './category.service';

import { Page } from '@types';

import { PageOptionsDTO } from 'src/common/dto';

@Controller()
export class CategoryController extends SuperAdminController {
  constructor(private categoryService: CategoryService) {
    super();
  }

  // @HttpCode(HttpStatus.OK)
  // @Get()
  // public async getAllCategories(
  //   @Query() pageOptionsDTO: PageOptionsDTO,
  // ): Promise<Page<str>> {
  //   return this.categoryService.getAllCategories(pageOptionsDTO);
  // }
}
