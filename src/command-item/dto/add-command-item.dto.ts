import { ApiProperty } from '@nestjs/swagger';

export class AddCommandItemDto {
    @ApiProperty({ required: true })
    quantity: number;
    @ApiProperty({ required: true })
    productId: string;
}
