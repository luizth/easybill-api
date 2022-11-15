import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WorkSessionService } from './work-session.service';

import { FinishWorkSessionDto } from './dto/finish-work-session.dto';
import { JoinWorkSessionDto } from './dto/join-work-session.dto';
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
    return this.workSessionService.join(joinWorkSessionDto);
  }

  @Post('finish')
  finish(@Body() finishWorkSessionDto: FinishWorkSessionDto) {
    return this.workSessionService.finish(finishWorkSessionDto);
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
