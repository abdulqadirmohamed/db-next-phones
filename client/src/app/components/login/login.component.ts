import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "email": "",
    "password": ""
  }
  http = inject(HttpClient)
  router = inject(Router)

  onSubmit(){
    this.http.post("http://localhost:3000/api/auth/sign-in", this.loginObj).subscribe((res:any)=>{
      if(res.data){
        localStorage.setItem('token', res.data.token)
        this.router.navigate(['dashboard'])
      }else{
        alert('error')
      }
    })
  }
}
