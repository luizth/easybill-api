import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CommandItemService } from '../command-item/command-item.service';

import { CommandStatus, PaymentMethod } from '@prisma/client';
import { Command } from './entities/command.entity';

import { OpenCommandDto } from './dto/open-command.dto';
import { CloseCommandDto } from './dto/close-command.dto';
import { AddCommandItemDto } from '../command-item/dto/add-command-item.dto';
import { UpdateCommandItemDto } from '../command-item/dto/update-command-item.dto';


@Injectable()
export class CommandService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly commandItemSvc: CommandItemService
    ) {}

    async open(workSessionId: number, openCommandDto: OpenCommandDto) {
        var command = new Command();
        
        command.title = openCommandDto.title;
        command.totalPrice = 0;
        command.status = CommandStatus.OPEN;
        command.workSessionId = workSessionId;

        const createdCommand = await this.prisma.command.create({ data: command });
        return {
            'id': createdCommand.id,
            'title': command.title,
            'status': command.status
        }
    }

    async update(id: number, data: object) {
        return await this.prisma.command.update({ where: { id: id },  data: data })
    }

    async close(id: number, closeCommandDto: CloseCommandDto) {        
        await this.updateTotalPrice(id);

        var discount = 0;
        if (closeCommandDto.discount != null)
            discount = closeCommandDto.discount

        var paymentMethod = PaymentMethod[closeCommandDto.paymentMethod];
        if (paymentMethod == null)
            throw new HttpException({ 
                status: HttpStatus.BAD_REQUEST, 
                error: 'Invalid payment method.' 
            }, HttpStatus.BAD_REQUEST);  

        const totalPrice = (await this.getTotalPrice(id))['totalPrice'];
        const data = {
            'discount': discount,
            'finalPrice': totalPrice - discount,
            'paymentMethod': paymentMethod,
            'status': CommandStatus.CLOSED
        }
        return await this.update(id, data);
    }

    async getTotalPrice(id: number) {
        const items = await this.commandItemSvc.getItemsByCommandId(id);

        var totalPrice = 0.0;
        for (const item of items)
            totalPrice += +item['totalPrice'];
        
        return {'totalPrice': totalPrice};
    }

    async updateTotalPrice(id: number) {
        const data = await this.getTotalPrice(id);
        return await this.update(id, data);
    }    

    async getItems(id: number) {
        return await this.commandItemSvc.getItemsByCommandId(id);
    }

    async addItem(id: number, addCommandItemDto: AddCommandItemDto) {
        const item = await this.commandItemSvc.add(id, addCommandItemDto);
        await this.updateTotalPrice(id);
        return item;
    }

    async updateItem(id: number, productId: number, updateCommandItemDto: UpdateCommandItemDto) {
        const item = await this.commandItemSvc.update(id, productId, updateCommandItemDto);
        await this.updateTotalPrice(id);
        return item;
    }

    async removeItem(id: number, productId: number) {
        const item = await this.commandItemSvc.remove(id, productId);
        await this.updateTotalPrice(id);
        return await this.commandItemSvc.getItem(id, productId);
    }

    async getCommandsByWorkSessionId(workSessionId: number) {
        var commandsResponse = await this.prisma.command.findMany({ where: { workSessionId: workSessionId } });

        var commands: object[] = [];
        for (const commandRes of commandsResponse) {
            const items = await this.commandItemSvc.getItemsByCommandId(commandRes.id);

            const command = {
                'id': commandRes.id,
                'title': commandRes.title,
                'numberOfPeople': commandRes.numberOfPeople,
                'totalPrice': commandRes.totalPrice,
                'discount': commandRes.discount,
                'finalPrice': commandRes.finalPrice,
                'paymentMethod': commandRes.paymentMethod,
                'status': commandRes.status,
                'items': items
            };
            commands.push(command);
        }
        return commands;
    }
}
