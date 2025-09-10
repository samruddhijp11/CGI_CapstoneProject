import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  message = '';
  success = false;

  constructor(private router: Router, private authService: AuthService) {}

  onRegister(): void {
    if (!this.name || !this.email || !this.password) {
      this.message = 'All fields are required!';
      this.success = false;
      return;
    }

    const user: User = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe((ok: boolean) => {
      if (ok) {
        this.message = '✅ Registration successful!';
        this.success = true;
        setTimeout(() => this.router.navigate(['/login']), 1200);
      } else {
        this.message = '❌ Email already registered!';
        this.success = false;
      }
    }, (err) => {
      this.message = '❌ Registration failed. Try again.';
      this.success = false;
      console.error('Register error', err);
    });
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }
}
