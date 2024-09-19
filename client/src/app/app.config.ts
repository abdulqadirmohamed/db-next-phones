import {
  ApplicationConfig,
  importProvidersFrom,
  NgModule,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

import { routes } from './app.routes';

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
  Package2
} from 'lucide-angular';
import { authInterceptor } from './interceptor/auth.interceptor';
import { MessageService } from 'primeng/api';

NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule
  ],
  providers: [MessageService]
})

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ToastModule,
    importProvidersFrom(
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
        Package2
      })
    )
  ],
};
