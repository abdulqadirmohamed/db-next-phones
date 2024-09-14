import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';

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
  Plus
} from 'lucide-angular';
import { authInterceptor } from './interceptor/auth.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useValue: authInterceptor, // Your functional interceptor
      multi: true, // This ensures Angular can support multiple interceptors
    },
    provideHttpClient(),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
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
        Plus
      })
    )
  ],
};
