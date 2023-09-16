import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { CommandService } from './command.service';

import { CloseCommandDto } from './dto/close-command.dto';
import { AddCommandItemDto } from '../command-item/dto/add-command-item.dto';
import { UpdateCommandItemDto } from '../command-item/dto/update-command-item.dto';


@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Put(':id/close')
  close(@Param('id') id: string, @Body() closeCommandDto: CloseCommandDto) {
    return this.commandService.close(+id, closeCommandDto);
  }

  @Get(':id/total-price')
  getTotalPrice(@Param('id') id: string) {
    return this.commandService.getTotalPrice(+id);
  }

  @Get(':id/items')
  getCommands(@Param('id') id: string) {
    return this.commandService.getItems(+id);
  }

  @Post(':id/items')
  addItem(@Param('id') id: string, @Body() addCommandItemDto: AddCommandItemDto) {
    return this.commandService.addItem(+id, addCommandItemDto);
  }

  @Put(':id/items/:productId')
  updateItem(@Param('id') id: string, @Param('productId') productId: string, @Body() updateCommandItemDto: UpdateCommandItemDto) {
    return this.commandService.updateItem(+id, +productId, updateCommandItemDto);
  }

  @Delete(':id/items/:productId')
  removeItem(@Param('id') id: string, @Param('productId') productId: string) {
    return this.commandService.removeItem(+id, +productId);
  }
}
