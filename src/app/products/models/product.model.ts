
export interface Product {
   id: string;
   name: string;
   description: string;
   reference: string;
   image: string;
   price: number;
   quantity?: number;
   addedToBasket?: boolean;
}
