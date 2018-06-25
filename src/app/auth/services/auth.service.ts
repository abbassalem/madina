import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Authenticate, User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  endpoint = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  login({ email, password }: Authenticate): Observable<User[]> {

    const params = new HttpParams();
    params.set('email', email);
    params.set('password', password);
    return this.http.get<User[]>(this.endpoint + '?email=' + email + '&password=' + password);
  }

  logout() {
    return of(true);
  }
}
