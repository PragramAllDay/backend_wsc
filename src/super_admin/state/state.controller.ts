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

import { StateService } from './state.service';

import { Page, State } from '@types';

import { PageOptionsDTO } from 'src/common/dto';
import { CreateStateDTO } from './dto';

@Controller()
export class StateController extends SuperAdminController {
  constructor(private stateService: StateService) {
    super();
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllStates(
    @Query() pageOptionsDto: PageOptionsDTO,
  ): Promise<Page<State>> {
    return this.stateService.getAllStates(pageOptionsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getState(@Param('id') id: string): Promise<State> {
    return this.stateService.getState(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createState(
    @Body() createStateDto: CreateStateDTO,
  ): Promise<State> {
    return this.stateService.createState(createStateDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteState(@Param('id') id: string): Promise<State> {
    return this.stateService.deleteState(id);
  }
}
