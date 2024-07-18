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

import { StoreOwnerService } from './store_owner.service';

import { Page, StoreOwner } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateStoreOwnerDTO } from './dto';

@Controller()
export class StoreOwnerController extends SuperAdminController {
  constructor(private storeOwnerService: StoreOwnerService) {
    super();
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllStoreOwners(
    @Query() pageOptionsDto: PageOptionsDTO,
  ): Promise<Page<StoreOwner>> {
    return this.storeOwnerService.getAllStoreOwners(pageOptionsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getStoreOwner(@Param('id') id: string): Promise<StoreOwner> {
    return this.storeOwnerService.getStoreOwner(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createStoreOwner(
    @Body() createStoreOwnerDto: CreateStoreOwnerDTO,
  ): Promise<StoreOwner | string> {
    return this.storeOwnerService.createStoreOwner(createStoreOwnerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteStoreOwner(@Param('id') id: string): Promise<StoreOwner> {
    return this.storeOwnerService.deleteStoreOwner(id);
  }
}
