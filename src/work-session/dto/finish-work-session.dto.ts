import { ApiProperty } from '@nestjs/swagger';

export class FinishWorkSessionDto {
    @ApiProperty({ required: true })
    code: string;
}