import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbCollapseModule, RouterLink],
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css',
})
export class NavAdminComponent {
  constructor(
    private userservice: UserService,
    private cookieservice: CookieService,
    private router: Router
  ) {}

  isMenuCollapsed = true;

  logout() {
    this.userservice.logout().subscribe({
      next: (response) => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          this.cookieservice.delete('taalam');
          this.router.navigate(['/login']);
        }
      },
    });
  }
}
