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
import { FormsModule } from '@angular/forms';

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
  Pencil
} from 'lucide-angular';
import { authInterceptor } from './interceptor/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      FormsModule, // Import FormsModule here
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
        Pencil
      })
    )
  ],
};
