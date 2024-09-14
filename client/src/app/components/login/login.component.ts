import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = {
    email: '',
    password: '',
  };
  errorMessage: string = '';

  http = inject(HttpClient)
  router = inject(Router)

  authSercies = inject(AuthService)



  // onSubmit(){
  //   this.http.post("http://localhost:3000/api/auth/sign-in", this.loginObj).subscribe((res:any)=>{
  //     if(res.data){
  //       localStorage.setItem('token', res.data.token)
  //       this.router.navigate(['dashboard'])
  //     }else{
  //       alert('error')
  //     }
  //   })
  // }

  onSubmit(){
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Username and password are required!';
      return;  // Stop if either field is empty
    }

    this.authSercies.login(this.credentials).subscribe({
      next:(response)=>{
          localStorage.setItem('token', response.token)
          this.router.navigate(['/dashboard'])
      },error: (err) => console.error(err),
    })
  }
}
