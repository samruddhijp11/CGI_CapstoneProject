import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';
  messageType: 'success' | 'error' | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value as { email: string; password: string };
    this.authService.login(email, password).subscribe((success: boolean) => {
      if (success) {
        const user = this.authService.currentUser();   // ✅ get user info
        this.showMessage('✅ Login successful!', 'success');

        setTimeout(() => {
          if (user?.role === 'ADMIN') {
            this.router.navigate(['/admin-orders']);   // ✅ admin redirect
          } else {
            this.router.navigate(['/']);               // ✅ normal user redirect
          }
        }, 800);  // ✅ the delay is here, after the closing brace

      } else {
        this.showMessage('❌ Invalid email or password', 'error');
      }
    }, (err) => {
      this.showMessage('❌ Login failed. Try again.', 'error');
      console.error('Login error', err);
    });
  } else {
    this.showMessage('❌ Please enter a valid email and password', 'error');
  }
}


  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
  }

  onGoogleLogin() {
    this.showMessage('🔗 Google login integration pending', 'success');
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToForgot() {
    this.router.navigate(['/forgot']);
  }
}
