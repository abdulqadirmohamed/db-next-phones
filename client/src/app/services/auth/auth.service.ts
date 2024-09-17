
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usernameSource = new BehaviorSubject<string | null>(null);
  currentUsername = this.usernameSource.asObservable();

  constructor(private http: HttpClient) {
    const storedUsername = localStorage.getItem('name');
    this.usernameSource.next(storedUsername);
  }


  onLogin(obj: any) {
    return this.http.post('http://localhost:3000/api/auth/sign-in', obj)
  }
  getAllUsers() {
    return this.http.get('http://localhost:3000/api/auth/users')
  }
   // Logout function
   logout() {
    // Remove token and username from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
   }
}
