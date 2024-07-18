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

import { CityService } from './city.service';

import { Page, City } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateCityDTO } from './dto';

@Controller()
export class CityController extends SuperAdminController {
  constructor(private cityService: CityService) {
    super();
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllCities(
    @Query() pageOptionsDto: PageOptionsDTO,
  ): Promise<Page<City>> {
    return this.cityService.getAllCities(pageOptionsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getCity(@Param('id') id: string): Promise<City> {
    return this.cityService.getCity(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createCity(@Body() createCityDto: CreateCityDTO): Promise<City> {
    return this.cityService.createCity(createCityDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteCity(@Param('id') id: string): Promise<City> {
    return this.cityService.deleteCity(id);
  }
}
