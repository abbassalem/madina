import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromProducts from '../reducers';
import * as ProductActions from '../actions/product.actions';

@Component({
  selector: 'bc-view-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-product-page></bc-selected-product-page>
  `,
})

export class ViewProductPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromProducts.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new ProductActions.Select(params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
