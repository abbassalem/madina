import { Product } from './product.model';
import { BasketItem } from './BasketItem.model';

export interface Order {
   id: number;
   orderDate: Date;
   deliveryDate: Date;
   deliveryTime: string;
   deliveryAddress: string;
   status: OrderStatus;
   items: Array<BasketItem>;
   userId: number;
}

export enum OrderStatus {
    OPEN = 'OPEN',
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    CLOSED = 'CLOSED',
    ARCHIVED = 'ARCHIVED'
}
