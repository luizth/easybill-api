import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../product/product.service';

import { CommandItem } from './entities/command-item.entity';
import { Product } from '../product/entities/product.entity';

import { AddCommandItemDto } from './dto/add-command-item.dto';
import { UpdateCommandItemDto} from './dto/update-command-item.dto';


@Injectable()
export class CommandItemService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly productSvc: ProductService
    ) {}

    async add(commandId: number, addCommandItemDto: AddCommandItemDto) {
        const product: Product = await this.productSvc.getProduct(addCommandItemDto.productId);
        if (product == null)
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'Product not found.' }, HttpStatus.NOT_FOUND);

        var commandItem = new CommandItem();
        commandItem.quantity = addCommandItemDto.quantity;
        commandItem.totalPrice = Number(product.price * commandItem.quantity);
        commandItem.productId = addCommandItemDto.productId;
        commandItem.commandId = commandId;

        const createdCommandItem = await this.prisma.commandItem.create({ data: commandItem });
        return {
            'id': createdCommandItem.id,
            'quantity': createdCommandItem.quantity,
            'totalPrice': createdCommandItem.totalPrice,
            'productId': createdCommandItem.productId
        };
    }

    async update(id: number, updateCommandItemDto: UpdateCommandItemDto) {
        const item = await this.prisma.commandItem.findUnique({ where: {id} });
        const product = await this.productSvc.getProduct(item.productId);

        const data = {
            "quantity": updateCommandItemDto.quantity,
            "totalPrice": product.price * updateCommandItemDto.quantity
        };

        const updatedCommandItem = await this.prisma.commandItem.update({ where: { id }, data: data });
        return {
            'id': updatedCommandItem.id,
            'quantity': updatedCommandItem.quantity,
            'totalPrice': updatedCommandItem.totalPrice,
            'productId': updatedCommandItem.productId
        };
    }

    async remove(id: number) {
        return await this.prisma.commandItem.delete({ where: {id} });
    }

    async getItemsByCommandId(commandId: number) {
        var itemsResponse = await this.prisma.commandItem.findMany({ where: { commandId: commandId } });
        
        var items: object[] = [];
        for (const itemRes of itemsResponse) {
            const item = {
                'id': itemRes.id,
                'quantity': itemRes.quantity,
                'totalPrice': itemRes.totalPrice,
                'productId': itemRes.productId
            };
            items.push(item);
        }
        return items;
    }
}
