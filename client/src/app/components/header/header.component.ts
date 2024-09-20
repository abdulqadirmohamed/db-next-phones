import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Menu  } from 'lucide-angular';
import { AuthService } from '../../services/auth/auth.service';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule, MenuModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  email: string | null = "";
  username: string | null = "";
  items: MenuItem[] | undefined;




  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    // Subscribe to username changes
    this.authService.currentUsername.subscribe((name) => {
      this.username = name;
    });

   //Notification
   this.items = [
    {
        label: 'Notifications',
        items: [
            {
                label: 'Refresh',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Export',
                icon: 'pi pi-upload'
            }
        ]
    }
]; 
  }



}
