import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/login.js';
    this.renderer.appendChild(document.body, script);
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        this.authService.setUser(response);

        // Chuyển hướng người dùng dựa trên username
        if (this.username === 'hungdungangular') {
          // Nếu username là "hungdungangular", chuyển hướng đến trang "admin"
          console.log('đăng nhập admin');
          this.router.navigate(['/admin']);
        } else {
          // Ngược lại, chuyển hướng đến trang "cart"
          console.log('đăng nhập user');
          this.router.navigate(['/cart']);
        }
      },
      (error: any) => {
        console.error(error);
        // Xử lý lỗi ở đây và hiển thị thông báo lỗi cho người dùng (errorMessage)
        this.errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.';
      }
    );
  }
}
