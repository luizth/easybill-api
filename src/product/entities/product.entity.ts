import { Decimal } from "@prisma/client/runtime";

export class Product {
    id: number;
    code: string
    title: string;
    category: string;
    price: Decimal;
}
