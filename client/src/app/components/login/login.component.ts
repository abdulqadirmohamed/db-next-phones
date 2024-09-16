import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
 
  loginObj:any = {
    "email":"",
    "password":""
  }

  router = inject(Router)
  constructor(private authService : AuthService){}

  onSubmit(){
    this.authService.onLogin(this.loginObj).subscribe((res:any)=>{
      if(res.result && res.result.token){
        localStorage.setItem('token', res.result.token)
        this.router.navigateByUrl('dashboard')
      }else{
        alert('wrong credentials')
      }
    })
  }
}
