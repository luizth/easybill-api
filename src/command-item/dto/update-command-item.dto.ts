import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommandItemDto {
    @ApiProperty({ required: true })
    quantity: number;
}
