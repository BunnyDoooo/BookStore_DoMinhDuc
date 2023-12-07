// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:44302/api/auth/login';
  private isLoggedIn = false;
  private user: any;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const data = { username, password };
    return this.http.post(this.apiUrl, data).pipe(
      // Xử lý phản hồi từ API sau khi đăng nhập thành công
      tap((user: any) => {
        // Lưu thông tin người dùng và đặt trạng thái đăng nhập là true
        this.user = user;
        this.isLoggedIn = true;
      })
    );
  }
  

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  getUser(): any {
    return this.user;
  }

  setUser(user: any) {
    this.user = user;
  }
}
