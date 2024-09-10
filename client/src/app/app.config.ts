import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

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



export const appConfig: ApplicationConfig = {
  providers: [
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
