import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  register() {
    console.log("Form Durumu:", this.registerForm.valid);
    console.log("Form Verisi:", this.registerForm.value);

    const username = this.registerForm.get('username')?.value.trim();
    const email = this.registerForm.get('email')?.value.trim();
    const password = this.registerForm.get('password')?.value.trim();

    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    this.authService.register(username, email, password).subscribe({
      next: (res) => {
        console.log("Register Response:", res);
        if (res?.message) {
          alert(res.message); //  JSON'dan gelen mesajı göster
          this.router.navigate(['/login']);
        } else {
          alert("Unknown response from server.");
        }
      },
      error: (err) => {
        console.error("Backend Hata:", err);
        const errorMessage = err.error?.error || err.error?.message || JSON.stringify(err.error);
        alert('Registration failed: ' + errorMessage);
      },
    });
  }
}
