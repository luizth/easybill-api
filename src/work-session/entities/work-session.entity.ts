import { DayOfWeek, WorkSessionStatus } from '@prisma/client';

export class WorkSession {
    id: number
    code: string;
    title: string;
    date: string;
    dayOfWeek: DayOfWeek;
    status: WorkSessionStatus;
    elapsedTime: number;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}
