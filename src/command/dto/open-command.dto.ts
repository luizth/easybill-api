import { ApiProperty } from '@nestjs/swagger';

export class OpenCommandDto {
    @ApiProperty({ required: true })
    title: string;
}
