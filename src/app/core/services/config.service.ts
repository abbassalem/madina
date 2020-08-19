import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class ConfigService {


  constructor(private db: AngularFirestore) {
  }

  // getConfig() {
  //   return this.http.get<any>(this.endpoint + '/config');
  // }


  getDeliveryTimes () {
    // TODO: 
    return this.db.collection('/deliveryTimes');
  }

}

