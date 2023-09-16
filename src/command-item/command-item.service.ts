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

    async getItem(commandId: number, productId: number) {
        const item = await this.prisma.commandItem.findUnique({ where: { commandId_productId: {commandId: commandId, productId: productId} } });
        return {
            'quantity': item.quantity,
            'totalPrice': item.totalPrice,
            'productId': productId
        };
    }

    async add(commandId: number, addCommandItemDto: AddCommandItemDto) {
        const product: Product = await this.productSvc.getProduct(addCommandItemDto.productId);
        if (product == null)
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'Product not found.' }, HttpStatus.NOT_FOUND);

        var commandItem = new CommandItem();
        commandItem.quantity = addCommandItemDto.quantity;
        commandItem.totalPrice = Number(product.price) * commandItem.quantity;
        commandItem.productId = addCommandItemDto.productId;
        commandItem.commandId = commandId;

        const createdCommandItem = await this.prisma.commandItem.create({ data: commandItem });
        return {
            'quantity': createdCommandItem.quantity,
            'totalPrice': createdCommandItem.totalPrice,
            'commandId': createdCommandItem.commandId,
            'productId': createdCommandItem.productId
        };
    }

    async update(commandId: number, productId: number, updateCommandItemDto: UpdateCommandItemDto) {
        const product = await this.productSvc.getProduct(productId);

        const data = {
            "quantity": updateCommandItemDto.quantity,
            "totalPrice": Number(product.price) * updateCommandItemDto.quantity
        };

        const updatedCommandItem = await this.prisma.commandItem.update({ where: { commandId_productId: {commandId: commandId, productId: productId} }, data: data });
        return {
            'quantity': updatedCommandItem.quantity,
            'totalPrice': updatedCommandItem.totalPrice,
            'commandId': commandId,
            'productId': productId
        };
    }

    async remove(commandId: number, productId: number) {
        return await this.prisma.commandItem.delete({ where: { commandId_productId: {commandId: commandId, productId: productId} } });
    }

    async getItemsByCommandId(commandId: number) {
        var itemsResponse = await this.prisma.commandItem.findMany({ where: { commandId: commandId } });
        
        var items: object[] = [];
        for (const itemRes of itemsResponse) {
            const item = {
                'quantity': itemRes.quantity,
                'totalPrice': itemRes.totalPrice,
                'commandId': commandId,
                'productId': itemRes.productId
            };
            items.push(item);
        }
        return items;
    }
}
