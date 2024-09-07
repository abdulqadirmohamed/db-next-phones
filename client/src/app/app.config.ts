import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';

import { Bell, Search, ShoppingBag, Users, ScanLine, Settings, LogOut, LayoutDashboard, LucideAngularModule } from "lucide-angular";


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),

  importProvidersFrom(LucideAngularModule.pick({ Bell, Search, LayoutDashboard, ShoppingBag, Users, ScanLine, Settings, LogOut }))
  ]
};
