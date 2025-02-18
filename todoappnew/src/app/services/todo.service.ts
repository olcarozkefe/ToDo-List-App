import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiUrl = 'http://localhost:8080/todos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  addTodo(todo: { title: string; completed: boolean; username: string }): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    console.log('İstek gönderiliyor: ', todo, headers); //  Debug için log eklendi

    return this.http.post<any>(`${this.apiUrl}/add`, todo, { headers });
  }
  getTodos(username: string): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/user?username=${username}`, { headers });

  }


}
