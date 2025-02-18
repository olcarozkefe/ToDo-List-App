import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private tokenKey = 'authToken';
  private usernameKey = 'username';


  constructor(private http: HttpClient, private router: Router) {}

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      console.error('JWT token bulunamadı!');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  saveToken(token: string, username: any) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.usernameKey, username);
  }

  getUsername(): string {
    return localStorage.getItem(this.usernameKey) ?? '';
  }



  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);  // Token'ı localStorage'dan sil
    this.router.navigate(['/login']);  // Login sayfasına yönlendir
  }


}
