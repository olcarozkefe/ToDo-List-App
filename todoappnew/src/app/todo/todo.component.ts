import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgStyle} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todo.component.html',
  imports: [
    FormsModule,
    NgStyle,
    NgForOf
  ],
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  newTodo: string = '';
  currentDate: string = '';

  constructor(private todoService: TodoService, private authService: AuthService,  private router: Router) {}

  ngOnInit() {
    this.loadTodos();
    // this.updateDate();
    // setInterval(() => this.updateDate(), 1000 * 60 * 60);
  }

  addTodo() {
    if (this.newTodo.trim()) {
      // const username = this.authService.getUsername() ?? '';
      const todo = {
        id: null,
        title: this.newTodo,
        completed: false,
        username: this.authService.getUsername(),
      };

      this.todoService.addTodo(todo).subscribe({
        next: (response) => {
          console.log('Todo added:', response);
          this.todos.push(response); //
          this.newTodo = '';
        },
        error: (err) => {
          alert('Failed to add new todo: ' + err.error);
        },
      });
    }
  }

  loadTodos() {
    const username = this.authService.getUsername();
    if (username) {
      console.log('Todo Listesi Yükleniyor...');
      console.log('API İsteği:', `${this.todoService.apiUrl}/user?username=${username}`);

      this.todoService.getTodos(username).subscribe({
        next: (response) => {
          console.log('API Yanıtı:', response); // API verisini kontrol et
          this.todos = response;
        },
        error: (err) => {
          console.error('API Hatası:', err); //  Hata varsa göster
          alert('Failed to fetch to-do list.');
        },
      });
    }
  }


  toggleCompletion(todo: any) {
    todo.completed = !todo.completed;
    console.log('Todo güncellendi:', todo);
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    console.log('Todo silindi, ID:', id);
  }

  logout() {
    this.authService.logout();  // Token'ı temizle
  }

  // updateDate() {
  //   const today = new Date();
  //   this.currentDate = today.toLocaleDateString('tr-TR', {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });
  // }

}
