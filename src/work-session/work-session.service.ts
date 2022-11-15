import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CommandService } from '../command/command.service';
import { ProductService } from '../product/product.service';

import { CommandStatus, DayOfWeek, WorkSessionStatus } from '@prisma/client';
import { DayOfWeekMap } from './enums/day-of-week.enum';
import { WorkSession } from './entities/work-session.entity';

import { FinishWorkSessionDto } from './dto/finish-work-session.dto';
import { JoinWorkSessionDto } from './dto/join-work-session.dto';
import { StartWorkSessionDto } from './dto/start-work-session.dto';
import { OpenCommandDto } from '../command/dto/open-command.dto';


@Injectable()
export class WorkSessionService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly commandSvc: CommandService,
        private readonly productSvc: ProductService,
    ) {}

    async getByCode(code: string) {
        const workSession = await this.prisma.workSession.findUnique({ where: { code: code } });
        if (workSession == null)
            throw new HttpException({ 
                status: HttpStatus.NOT_FOUND, 
                error: 'Work Session not found.' 
            }, HttpStatus.NOT_FOUND);
        return workSession;
    }

    async start(startWorkSessionDto: StartWorkSessionDto) {
        var workSession = new WorkSession();

        workSession.code = this.newCode();
        workSession.title = startWorkSessionDto.title;
        workSession.date = this.date();
        workSession.dayOfWeek = this.dayOfWeek();
        workSession.status = WorkSessionStatus.IN_PROGRESS;

        const createdWorkSession = await this.prisma.workSession.create({ data: workSession });
        const products = await this.productSvc.getProducts();

        return {
            'id': createdWorkSession.id,
            'code': createdWorkSession.code,
            'title': createdWorkSession.title,
            'status': createdWorkSession.status,
            'products': products
        };
    }

    async join(code: string) {
        const workSession = await this.getByCode(code);
        if (workSession.status == WorkSessionStatus.ENDED)
            throw new HttpException({ 
                status: HttpStatus.BAD_REQUEST, 
                error: 'Work Session has ended.'
            }, HttpStatus.BAD_REQUEST);

        const commands = await this.commandSvc.getCommandsByWorkSessionId(workSession.id);
        const products = await this.productSvc.getProducts();

        return {
            'id': workSession.id,
            'code': workSession.code,
            'title': workSession.title,
            'status': workSession.status,
            'commands': commands,
            'products': products
        }
    }

    async finish(finishWorkSessionDto: FinishWorkSessionDto) {
        const commands = await this.getCommands(finishWorkSessionDto.code);

        var income = 0;
        for (const command of commands) {
            if (command['status'] == CommandStatus.OPEN ) {
                throw new HttpException({ 
                    status: HttpStatus.BAD_REQUEST, 
                    error: 'Work Session has Commands that are still open.' 
                }, HttpStatus.BAD_REQUEST); 
            }
            income += +command['totalPrice'];
        }

        const workSession: WorkSession = await this.getByCode(finishWorkSessionDto.code);

        const now = new Date();
        const createdAt = new Date(workSession.createdAt);

        const data = {
            'status': WorkSessionStatus.ENDED,
            'elapsedTime': now.getTime() - createdAt.getTime(),
            'income': income
        }

        const updatedWorkSession = await this.prisma.workSession.update({ where: { id: workSession.id }, data: data });

        return {
            'code': updatedWorkSession.code,
            'status': updatedWorkSession.status,
            'elapsedTime': updatedWorkSession.elapsedTime,
            'income': income
        }
    }

    async getCommands(code: string) {
        const workSession = await this.getByCode(code);
        return await this.commandSvc.getCommandsByWorkSessionId(workSession.id);
    }

    async openCommand(code: string, openCommandDto: OpenCommandDto) {
        const workSession = await this.getByCode(code);
        return await this.commandSvc.open(workSession.id, openCommandDto);
    }

    async getProducts() {
        return await this.productSvc.getProducts();
    }

    /*
        Utility Functions 
    */

    private newCode(len: number = 6): string {
        var result           = '';
        var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < len; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    private date(): string {
        const d = new Date();
        const date = d.toISOString().substring(0, 10);
        return date;
    }

    private dayOfWeek(): DayOfWeek {
        const d = new Date();
        const dayOfWeek = DayOfWeekMap[d.getDay()];
        return dayOfWeek;
    }
}
