import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty({ required: false })
    title
    @ApiProperty({ required: false })
    price
    @ApiProperty({ required: false})
    category
}