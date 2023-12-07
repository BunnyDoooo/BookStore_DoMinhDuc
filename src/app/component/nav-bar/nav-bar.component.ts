import { Component, OnInit, Renderer2 } from '@angular/core';
import { SearchService } from 'src/app/service/search.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  searchTerm: string = '';
  username: string = '';
  isLoggedIn: boolean = false;
  

  constructor(
    private renderer: Renderer2,
    private searchService: SearchService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/navbar.js';
    this.renderer.appendChild(document.body, script);

    // Lấy thông tin trạng thái đăng nhập từ AuthService
    this.isLoggedIn = this.authService.getIsLoggedIn();

    // Lấy thông tin người dùng đã đăng nhập
    const user = this.authService.getUser();
    if (user && user.Username) {
      this.username = user.Username;
    }
  }
  onSearch(event: any) {
    const searchTerm = event.target.value;
    this.searchService.setSearchTerm(searchTerm);
  }
  


  
}
