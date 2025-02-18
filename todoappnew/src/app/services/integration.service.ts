import { Injectable } from '@angular/core';
import {LoginResponse} from '../models/login-response';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/login-request';

const API_URL = 'http://localhost:8080/api/doLogin';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  private apiUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  doLogin(request: LoginRequest): Observable<any> {
    return this.http.post('http://localhost:5432/api/login', request);
  }
}
