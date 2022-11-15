import { ApiProperty } from '@nestjs/swagger';

export class CloseCommandDto {
    @ApiProperty({ required: false, default: 0 })
    discount: number;
    @ApiProperty({ required: true })
    paymentMethod: string;
}
