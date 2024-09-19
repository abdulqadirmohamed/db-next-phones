import { Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth/auth.service';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule, SidebarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  email: string | null = "";
  username: string | null = "";

  sidebarVisible: boolean = true;

  constructor(private authService: AuthService) { }

 

  ngOnInit(): void {
    // Subscribe to username changes
    this.authService.currentUsername.subscribe((name) => {
      this.username = name;
    });
  }
}
