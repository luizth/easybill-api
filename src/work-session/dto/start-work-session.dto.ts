import { ApiProperty } from '@nestjs/swagger';

export class StartWorkSessionDto {
    @ApiProperty({ required: true })
    title: string;
}
