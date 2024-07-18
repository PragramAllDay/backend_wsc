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

import { CountryService } from './country.service';

import { Page, Country } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateCountryDTO } from './dto';

@Controller()
export class CountryController extends SuperAdminController {
  constructor(private countryService: CountryService) {
    super();
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllCountries(
    @Query() pageOptionsDto: PageOptionsDTO,
  ): Promise<Page<Country>> {
    return this.countryService.getAllCountries(pageOptionsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getCountry(@Param('id') id: string): Promise<Country> {
    return this.countryService.getCountry(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createCountry(
    @Body() createCountryDto: CreateCountryDTO,
  ): Promise<Country> {
    return this.countryService.createCountry(createCountryDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteCountry(@Param('id') id: string): Promise<Country> {
    return this.countryService.deleteCountry(id);
  }
}
