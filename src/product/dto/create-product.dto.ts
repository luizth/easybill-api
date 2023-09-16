import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ required: true })
    code
    @ApiProperty({ required: true })
    title
    @ApiProperty({ required: true })
    price
    @ApiProperty({ required: false, default: 'Default' })
    category
}
