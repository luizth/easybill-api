import { CommandStatus, PaymentMethod } from '@prisma/client';

export class Command {
    title: string;
    numberOfPeople?: number = null;
    totalPrice: number;
    discount?: number = null;
    finalPrice?: number = null;
    paymentMethod?: PaymentMethod = null;
    status: CommandStatus;
    workSessionId: number;
}

