import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'bc-product-preview-list',
  template: `
    <bc-product-preview *ngFor="let product of products" [product]="product"></bc-product-preview>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
  ],
})
export class ProductPreviewListComponent {
  @Input() products: Product[]
  
  constructor() {
  }
}
