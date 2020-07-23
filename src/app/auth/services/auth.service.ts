import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Authenticate, User } from '../models/user';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  endpoint = environment.endpoint;

  constructor(private http: HttpClient) {
  }

  login({ email, password }: Authenticate): Observable<User[]> {
    const params = new HttpParams();
    params.set('email', email);
    params.set('password', password);
    return this.http.get<User[]>(this.endpoint + '/users' + '?email=' + email + '&password=' + password);
  }

  logout() {
    return of(true);
  }
}
