import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import * as fromCategoryActions from './../actions/category.actions';
import * as fromCategories from './../reducers/categories.reducer';

@Component({
  selector: 'app-list-product',
  template: `
  <mat-toolbar>
  <span class="toolbar-flex">
      <nav mat-tab-nav-bar >
        <a mat-tab-link 
            *ngFor="let routeLink of routeLinks; let i=index"
              [routerLink]="routeLink.path"
              routerLinkActive #rla="routerLinkActive"
              [active]="i === currentTabIndex">
              {{routeLink.label}}
        </a>
      </nav>
    </span>  
</mat-toolbar>

  <app-product-preview
         *ngFor="let product of products"
         [product]="product"
         [categoryId]="currentTabIndex">
    </app-product-preview>
`,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .toolbar-flex{
      flex: 1 0.5 auto;
      float:left
    }
  `,
  ],
})
//[active]="rla.isActive">
export class ProductListComponent implements OnInit, OnChanges {

  @Input() categories: Category[];
  @Input() routeLinks: Array<{id: number,label: string, path: string}>;
  products: Product[];
  currentTabIndex: number = 0;

  constructor(private store: Store<fromCategories.CategoryState>, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentTabIndex = +params['id'];
      this.store.dispatch(new fromCategoryActions.Select(this.currentTabIndex));
      if (this.categories[this.currentTabIndex]) {
        this.products = this.categories[this.currentTabIndex].products;
      }

    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.categories[this.currentTabIndex]) {
      this.products = this.categories[this.currentTabIndex].products;
    }
  }
}











 // @Output() tabIndexChanged: EventEmitter<number> = new EventEmitter<number>();
    // this.router.events.subscribe((res) => {
    //   this.activeLinkIndex =
    //     this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    // });

  // tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
  //   this.tabIndexChanged.emit(tabChangeEvent.index);
  // }

// <mat-tab-group (selectedTabChange)="tabChanged($event)">
// <mat-tab *ngFor="let cat of categories" [label]="cat.name">
//     <app-product-preview
//         *ngFor="let product of cat.products"
//         [product]="product">
//     </app-product-preview>
// </mat-tab>
// </mat-tab-group>
