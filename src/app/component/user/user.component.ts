import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  newUser: any = {};
  editMode = false;
  username: string = '';
  isLoggedIn: boolean = false;


  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private renderer: Renderer2,
    public authService: AuthService,
    
  ) {}

  ngOnInit() {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/admin.js';
    this.renderer.appendChild(document.body, script);
    this.getUsers();
    this.isLoggedIn = this.authService.getIsLoggedIn();

    // Lấy thông tin người dùng đã đăng nhập
    const user = this.authService.getUser();
    if (user && user.Username) {
      this.username = user.Username;
    }
   
  
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  addUser() {
    if (!this.newUser.Username || !this.newUser.Password || !this.newUser.FirstName || !this.newUser.LastName) {
      alert("Vui lòng điền đầy đủ thông tin trước khi thêm người dùng mới.");
      return;
    }
    this.userService.createUser(this.newUser).subscribe(() => {
      this.getUsers();
      this.newUser = {};
      this.snackbarService.showSnackbar('Người dùng mới đã được thêm.', 'Đóng');
    });
  }

  editUser(user: any) {
    this.newUser = { ...user };
    this.editMode = true;
  }

  saveUser() {
    this.userService.updateUser(this.newUser.Id, this.newUser).subscribe(() => {
      this.getUsers();
      this.newUser = {};
      this.editMode = false;
      this.snackbarService.showSnackbar('Thông tin người dùng đã được cập nhật.', 'Đóng');
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.getUsers();
      this.snackbarService.showSnackbar('Người dùng đã bị xóa.', 'Đóng');
    });
  }

  cancelEdit() {
    this.newUser = {};
    this.editMode = false;
  }


}
