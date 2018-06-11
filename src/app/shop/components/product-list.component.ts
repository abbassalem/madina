import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, AfterViewInit, DoCheck } from '@angular/core';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as fromCategories from './../reducers/categories.reducer';
import { Observable, of } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material';
import * as fromCategoryActions from './../actions/category.actions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product',
  template: `
  <mat-toolbar>
  <span class="toolbar-flex">
      <nav mat-tab-nav-bar >
        <a mat-tab-link 
            *ngFor="let routeLink of routeLinks; let i = index;"
              [routerLink]="routeLink.link"
              routerLinkActive #rla="routerLinkActive"
              [active]="rla.isActive">
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

export class ProductListComponent implements OnInit, OnChanges {

  @Input() categories: Category[];
  @Input() routeLinks: Array<{ label: string, link: string, index: number }>;
  @Output() changeTabIndex: EventEmitter<number> = new EventEmitter();
  products: Product[];
  currentTabIndex: number = 0;

  constructor(private store: Store<fromCategories.CategoryState>, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('*** param - id : ' + params['id']);
      this.currentTabIndex = params['id'];
      this.changeTabIndex.emit(this.currentTabIndex);
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
