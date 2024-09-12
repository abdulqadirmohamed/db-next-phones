import { Component } from '@angular/core';
import { LoginComponent } from "../../components/login/login.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
