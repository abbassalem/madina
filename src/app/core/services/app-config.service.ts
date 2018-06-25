import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class AppConfigService {

  endpoint = 'http://localhost:3000/config';

  constructor(private http: HttpClient) {
  }

  getConfig (): Observable<any> {
    return this.http.get(this.endpoint);
  }

}

