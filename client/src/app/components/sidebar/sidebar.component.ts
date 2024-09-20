import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  isLeftSidebarCollapsed = input.required<boolean>()
  changeIsLeftSidebarCollapsed = output<boolean>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
  }
   // Logout function
   onLogout() {
    this.authService.logout(); 
    window.location.reload()
  }

  items = [
    {
      routeLink: 'dashboard',
      icon: 'layout-dashboard',
      label: 'Dashboard',
    },
    {
      routeLink: 'product',
      icon: 'shopping-bag',
      label: 'Products',
    },
    {
      routeLink: 'sales',
      icon: 'scan-line',
      label: 'Sales',
    },
    {
      routeLink: 'customer',
      icon: 'users',
      label: 'Customer',
    },
  ];


  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

}
