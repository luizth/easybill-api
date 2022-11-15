import { Module } from '@nestjs/common';
import { CommandItemService } from './command-item.service';

import { PrismaModule } from '../prisma/prisma.module';
import { ProductModule } from '../product/product.module';


@Module({
  providers: [CommandItemService],
  imports: [PrismaModule, ProductModule],
  exports: [CommandItemService],
})
export class CommandItemModule {}
