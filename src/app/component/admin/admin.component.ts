import { Component, OnInit, Renderer2 } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { SearchService } from 'src/app/service/search.service';
import { InventoryService } from 'src/app/service/inventory.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  books: any[] = [];
  newBook: any = {};
  editMode = false;
  searchQuery: string = '';
  username: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private bookService: BookService,
    private searchService: SearchService,
    private inventoryService: InventoryService,
    private snackbarService: SnackbarService,
    private renderer: Renderer2,
    public authService: AuthService,

  ) {}

  ngOnInit() {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/admin.js';
    this.renderer.appendChild(document.body, script);
    this.getBooks();
    this.isLoggedIn = this.authService.getIsLoggedIn();

    // Lấy thông tin người dùng đã đăng nhập
    const user = this.authService.getUser();
    if (user && user.Username) {
      this.username = user.Username;
    }
  }

  getBooks() {
    this.bookService.getAllBooks().subscribe((data: any) => {
      this.books = data;
    });
  }
  
  addBook() {
    if (!this.newBook.Title || !this.newBook.Price || !this.newBook.Quantity) {
      alert("Vui lòng điền đầy đủ thông tin trước khi thêm sản phẩm mới.");
      return; // Ngăn chương trình tiếp tục khi thông tin không hợp lệ
    }
    this.bookService.createBook(this.newBook).subscribe(() => {
      this.getBooks();
      this.newBook = {};
      console.log("Thêm thành công");
      this.snackbarService.showSnackbar('Sách mới đã được đưa lên.', 'Đóng');
    });
  }

  editBook(book: any) {
    this.newBook = { ...book };
    debugger
    this.newBook.Id = book.Id;
    this.editMode = true;
    console.log("Cho phép sửa sản phẩm");
  }
  

  saveBook() {
    this.bookService.updateBook(this.newBook.Id, this.newBook).subscribe(() => {
      this.getBooks();
      this.newBook = {};
      this.editMode = false;
      console.log("Lưu thành công");
      this.snackbarService.showSnackbar(`Sách đã được cập nhật.`, 'Đóng');
    });
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.getBooks();
      console.log("Xóa thành công");
      this.snackbarService.showSnackbar('Sách mới đã được đưa xuống kệ.', 'Đóng');
    });
  }

  cancelEdit() {
    this.newBook = {};
    this.editMode = false;
    console.log("Hủy thành công");
  }

// Trong thành phần TypeScript
searchBooks() {
  if (this.searchQuery) {
    debugger
    // Gọi dịch vụ tìm kiếm sách với giá trị searchQuery
    this.bookService.searchBooks(this.searchQuery).subscribe((data: any) => {
     
      this.books = data; // Cập nhật danh sách sách với kết quả tìm kiếm
    });
  } else {
    // Nếu searchQuery rỗng, hiển thị tất cả cuốn sách
    this.getBooks();
  }
}

uploadImage(event: any) {
  const selectedFile = event.target.files[0]; // Lấy tệp được chọn (chỉ lấy tệp đầu tiên)
  if (selectedFile) {
      // Chuyển đổi tệp thành URL hình ảnh và gán vào newBook.ImgUrl
      this.getBase64(selectedFile).then((dataUrl: string) => {
          this.newBook.ImgUrl = dataUrl;
      });
  }
}

getBase64(file: any): Promise<string> {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          resolve(reader.result as string);
      };
      reader.onerror = (error) => {
          reject(error);
      };
  });
}




 
}
