import { Module } from '@nestjs/common';
import { WorkSessionService } from './work-session.service';
import { WorkSessionController } from './work-session.controller';

import { PrismaModule } from '../prisma/prisma.module';
import { CommandModule } from '../command/command.module';
import { ProductModule } from '../product/product.module';


@Module({
  controllers: [WorkSessionController],
  providers: [WorkSessionService],
  imports: [PrismaModule, CommandModule, ProductModule]
})
export class WorkSessionModule {}
