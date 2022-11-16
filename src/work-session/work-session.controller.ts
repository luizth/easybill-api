import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WorkSessionService } from './work-session.service';

import { FinishWorkSessionDto } from './dto/finish-work-session.dto';
import { JoinWorkSessionDto } from './dto/join-work-session.dto';
import { RemoveWorkSessionDto } from './dto/remove-work-session.dto';
import { StartWorkSessionDto } from './dto/start-work-session.dto';
import { OpenCommandDto } from '../command/dto/open-command.dto';


@Controller('work-session')
export class WorkSessionController {
  constructor(private readonly workSessionService: WorkSessionService) {}

  @Post('start')
  start(@Body() startWorkSessionDto: StartWorkSessionDto) {
    return this.workSessionService.start(startWorkSessionDto);
  }

  @Post('join')
  join(@Body() joinWorkSessionDto: JoinWorkSessionDto) {
    return this.workSessionService.join(joinWorkSessionDto.code);
  }

  @Post('finish')
  finish(@Body() finishWorkSessionDto: FinishWorkSessionDto) {
    return this.workSessionService.finish(finishWorkSessionDto);
  }

  @Post('remove')
  delete(@Body() removeWorkSessionDto: RemoveWorkSessionDto) {
    return this.workSessionService.remove(removeWorkSessionDto);
  }

  @Get(':code')
  joinByCode(@Param('code') code: string) {
    return this.workSessionService.join(code);
  }

  @Get(':code/preview-income')
  previewIncome(@Param('code') code: string) {
    return this.workSessionService.getIncome(code);
  }

  @Get(':code/commands')
  getCommands(@Param('code') code: string) {
    return this.workSessionService.getCommands(code);
  }

  @Post(':code/commands')
  openCommand(@Param('code') code: string, @Body() openCommandDto: OpenCommandDto) {
    return this.workSessionService.openCommand(code, openCommandDto);
  }

  @Get(':code/products')
  getProducts(@Param('code') code: string) {
    return this.workSessionService.getProducts();
  }
}
