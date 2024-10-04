import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import {
  Bell,
  Search,
  ShoppingBag,
  Users,
  ScanLine,
  Settings,
  LogOut,
  LayoutDashboard,
  LucideAngularModule,
  TrendingUp,
  CircleDollarSign,
  Plus,
  Package2,
  Menu,
  X,
  Trash2,
  Pencil,
  Files
} from 'lucide-angular';



const firebaseConfig = {
  apiKey: "AIzaSyBNc8AL5NDRWn6Pbje2Hbrgm4PQsF-8fZQ",
  authDomain: "next-auth-6d7d6.firebaseapp.com",
  projectId: "next-auth-6d7d6",
  storageBucket: "next-auth-6d7d6.appspot.com",
  messagingSenderId: "662200400092",
  appId: "1:662200400092:web:a57fddd8cdb56164b8dc19",
  measurementId: "G-9SPYBWF5X2"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(()=> getAuth()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      FormsModule, 
      ReactiveFormsModule,
      BrowserModule,
      BrowserAnimationsModule,
      LucideAngularModule.pick({
        Bell,
        Search,
        LayoutDashboard,
        ShoppingBag,
        Users,
        ScanLine,
        Settings,
        LogOut,
        TrendingUp,
        CircleDollarSign,
        Plus,
        Package2,
        Menu,
        X,
        Trash2,
        Pencil,
        Files
      })
    )
  ],
};
