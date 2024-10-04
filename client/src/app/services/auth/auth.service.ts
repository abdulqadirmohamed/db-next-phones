import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { from, Observable, single } from 'rxjs';
import { UserInterface } from '../../types/user.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);


  user$ = user(this.firebaseAuth); // Observable for Firebase user

  currentUserSignal = signal<UserInterface | null | undefined>(undefined);

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  // Logout the user
  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut();
    return from(promise);
  }

   // Reset password
   resetPassword(email: string): Observable<void> {
    const promise = sendPasswordResetEmail(this.firebaseAuth, email)
      .then(() => {})
      .catch((error) => {
        console.error('Error sending password reset email:', error);
      });
    return from(promise);
  }
  
}
