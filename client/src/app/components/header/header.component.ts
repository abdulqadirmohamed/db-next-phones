import { Component, inject, OnInit } from '@angular/core';
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




  // constructor(private authService: AuthService) { }
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user: { email: any; displayName: any; }) => {
      if (user) {
        this.authService.currentUserSignal.set({
          email: user.email,
          username: user.displayName,
        });
        console.log(user.displayName)
        console.log(this.authService.currentUserSignal())
      } else {
        this.authService.currentUserSignal.set(null);
      }
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

  logout() {
    this.authService.logout().subscribe(() => {
      window.location.reload()
    });
  }

}
