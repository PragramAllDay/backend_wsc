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

import { StoreService } from './store.service';

import { Page } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateStoreDto, UpdateStoreDto } from '../store/dto';
import { Store } from '@prisma/client';

@Controller()
export class StoreController extends SuperAdminController {
  constructor(private storeService: StoreService) {
    super();
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllStores(
    @Query() pageOptionsDto: PageOptionsDTO,
  ): Promise<Page<Store>> {
    return this.storeService.getAllStores(pageOptionsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getStore(@Param('id') id: string): Promise<Store> {
    return this.storeService.getStore(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createStore(
    @Body() createStoreDto: CreateStoreDto,
  ): Promise<Store> {
    return this.storeService.createStore(createStoreDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateStoreDto,
  ): Promise<Store> {
    return this.storeService.updateStore(id, data);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteStore(@Param('id') id: string): Promise<Store> {
    return this.storeService.deleteStore(id);
  }
}
