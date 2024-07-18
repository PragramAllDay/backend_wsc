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

import { StoreService } from './store.service';

import { Page, Store } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateStoreDTO } from '../store/dto';

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
  @Get()
  public async getStore(@Param('id') id: string): Promise<Store> {
    return this.storeService.getStore(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createStore(
    @Body() createStoreDto: CreateStoreDTO,
  ): Promise<Store> {
    return this.storeService.createStore(createStoreDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteStore(@Param('id') id: string): Promise<Store> {
    return this.storeService.deleteStore(id);
  }
}
