import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable()
export class ConfigService {

  endpoint = environment.endpoint;

  constructor(private http: HttpClient) {
  }

  // getConfig() {
  //   return this.http.get<any>(this.endpoint + '/config');
  // }


  getDeliveryTimes () {
    return this.http.get<string[]>(this.endpoint + '/deliveryTimes');
  }

}

