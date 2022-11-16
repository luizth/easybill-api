import { ApiProperty } from '@nestjs/swagger';

export class RemoveWorkSessionDto {
    @ApiProperty({ required: true })
    code: string;
}
