import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';

import { PrismaModule } from '../prisma/prisma.module';
import { CommandItemModule } from '../command-item/command-item.module';


@Module({
  controllers: [CommandController],
  providers: [CommandService],
  imports: [PrismaModule, CommandItemModule],
  exports: [CommandService],
})
export class CommandModule {}
