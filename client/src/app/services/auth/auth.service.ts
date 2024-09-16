
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http:HttpClient) { }

  onLogin(obj:any){
    return this.http.post('http://localhost:3000/api/auth/sign-in', obj)
  }
  getAllUsers(){
    return this.http.get('http://localhost:3000/api/auth/users')
  }
}
