import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';

//  Standalone component'ler import listesine eklenmeli!
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TodoComponent } from './todo/todo.component';

//  Servisleri eklemeyi unutmayalım!
import { AuthService } from './services/auth.service';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent, //  Sadece `AppComponent` burada olmalı!
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    RegisterComponent, //  Standalone component olarak burada olmalı
    LoginComponent, //  Standalone component olarak burada olmalı
    TodoComponent, //  Standalone component olarak burada olmalı
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    AuthService, //  Servisleri ekledik!
    TodoService //  Servisleri ekledik!
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
