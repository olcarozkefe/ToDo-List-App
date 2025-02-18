import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'

})
export class AppComponent implements OnInit {
  ngOnInit() {
  }
}
