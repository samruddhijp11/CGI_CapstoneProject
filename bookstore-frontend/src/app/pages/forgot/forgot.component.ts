import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  email = '';
  message = '';
  success = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    if (!this.email) {
      this.message = '❌ Please enter your email.';
      this.success = false;
      return;
    }

    this.authService.requestPasswordReset(this.email).subscribe((found: boolean) => {
      if (found) {
        this.message = '✅ Password reset link sent! (simulation)';
        this.success = true;
      } else {
        this.message = '❌ No account found with this email.';
        this.success = false;
      }
    }, (err) => {
      this.message = '❌ Error sending reset link. Try again.';
      this.success = false;
      console.error('Password reset error', err);
    });
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }
}
