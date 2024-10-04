import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);

  errorMessage: string | null = null;

  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });



  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService
      .login(rawForm.email, rawForm.password)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.errorMessage = this.getFirebaseErrorMessage(error);
        },
      });
  }

  getFirebaseErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/wrong-password':
        return "Incorrect password. Please try again.";
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }
}
