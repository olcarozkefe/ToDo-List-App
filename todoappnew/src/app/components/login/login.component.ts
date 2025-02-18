import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    RouterLink
  ]
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log("Form Durumu:", this.loginForm.valid);
    console.log("Form Verisi:", this.loginForm.value);

    if (this.loginForm.invalid) {
      alert('Please enter username and password.');
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username!, password!).subscribe({
      next: (response) => {
        console.log("Login Başarılı, Gelen Token:", response.token);
        this.authService.saveToken(response.token, username);
        alert('Login successful!');
        this.router.navigate(['/todo']);
      },
      error: (err) => {
        console.error("Login Hatası:", err);
        alert('Invalid username or password.');
      },
    });
  }
}
