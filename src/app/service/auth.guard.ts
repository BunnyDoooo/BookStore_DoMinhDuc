import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Nhớ import AuthService
@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
      if (this.authService.getIsLoggedIn()) {
        debugger
        // Nếu người dùng đã đăng nhập, cho phép họ truy cập route
        return true;
      } else {
        // Nếu người dùng chưa đăng nhập, chuyển hướng họ đến trang đăng nhập
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
  