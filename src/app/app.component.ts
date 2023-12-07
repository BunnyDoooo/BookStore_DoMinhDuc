import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookStore';
  isLoginPage: boolean = false;
  isAdminPage: boolean = false;
  isUserPage: boolean = false;
  constructor(private router: Router) {
    // Sử dụng sự kiện NavigationEnd để kiểm tra trang hiện tại
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        
        // Kiểm tra URL của trang hiện tại
        this.isLoginPage = event.url === '/login';
        this.isAdminPage = event.url === '/admin';
        this.isUserPage = event.url === '/user';
      }
    });
  }
}
