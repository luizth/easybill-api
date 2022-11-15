import { ApiProperty } from '@nestjs/swagger';

export class JoinWorkSessionDto {
    @ApiProperty({ required: true })
    code: string;
}
