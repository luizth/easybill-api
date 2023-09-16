import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';

import { WorkSessionModule } from './work-session/work-session.module';
import { CommandModule } from './command/command.module';
import { CommandItemModule } from './command-item/command-item.module';
import { ProductModule } from './product/product.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [PrismaModule, WorkSessionModule, CommandModule, CommandItemModule, ProductModule],
})
export class AppModule {}
