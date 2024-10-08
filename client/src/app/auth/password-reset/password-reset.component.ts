import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);

  errorMessage: string | null = null;
  message: string = '';

  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value!;
      
      // Call the resetPassword method and handle success or error
      this.authService.resetPassword(email).subscribe({
        next: () => {
          this.message = 'Password reset email sent.';
          this.form.reset();  // Optional: Reset form after successful submission
        },
        error: (err) => {
          this.message = 'Error: ' + err.message;
        }
      });
    } else {
      this.message = 'Please enter a valid email address.';
    }
  }
  
  
}
