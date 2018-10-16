import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ConfigService } from '../services/config.service';
import * as fromConfigActions from './../actions/configuration.actions';


@Injectable()
export class ConfigEffects {

  constructor(private actions$: Actions, private configService: ConfigService) {
  }

@Effect()
loadDeliveryTimes$: Observable<Action> = this.actions$.pipe(
  ofType<fromConfigActions.LoadDeliveryTimes>(fromConfigActions.ConfigActionTypes.LoadDeliveryTimes),
  switchMap( () => {
    return this.configService.getDeliveryTimes().pipe(
      map( (deliveryTimes: Array<string>) => {
        return new fromConfigActions.LoadDeliveryTimesComplete(deliveryTimes);
      }),
      catchError(err => of(new fromConfigActions.LoadDeliveryTimesError(err)))
    );
  })
);

}
