import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';
import { SearchService } from 'src/app/service/search.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { AuthService } from 'src/app/service/auth.service'; // Import AuthService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string = '';

  constructor(
    private bookService: BookService,
    private router: Router,
    private cartService: CartService,
    private snackbarService: SnackbarService,
    private searchService: SearchService,
    private authService: AuthService 
  ) { }

  ngOnInit(): void {
    this.loadBooks();

    this.searchService.searchResult$.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.loadBooks(); // Khi có sự kiện tìm kiếm, tải lại danh sách sản phẩm
    });
  }

  loadBooks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    if (this.searchTerm) {
      // Nếu có tìm kiếm, thực hiện tìm kiếm và hiển thị kết quả
      this.bookService.searchBooks(this.searchTerm).subscribe((data: any) => {
        this.books = data.slice(startIndex, endIndex);
      });
    } else {
      // Nếu không có tìm kiếm, hiển thị toàn bộ sản phẩm
      this.bookService.getAllBooks().subscribe((data: any) => {
        this.books = data.slice(startIndex, endIndex);
      });
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1) {
      this.currentPage = pageNumber;
      this.loadBooks();
    }
  }

  addToCart(book: any) {
    if (!this.authService.getIsLoggedIn()) {
      // Nếu người dùng chưa đăng nhập, chuyển họ đến trang đăng nhập
      this.router.navigate(['/login']);
      return; // Ngăn người dùng tiếp tục thực hiện thêm vào giỏ hàng
    }

    const defaultCartID = 1;

    this.cartService.getCartItemByBookID(book.Id).subscribe((cartItem: any) => {
      console.log('Cart item:', cartItem);

      if (cartItem) {
        cartItem.Quantity++;
        this.cartService.updateCartItemQuantity(cartItem).subscribe((updatedCartItem) => {
          console.log('Số lượng mục trong giỏ hàng đã được cập nhật:', updatedCartItem);
          this.snackbarService.showSnackbar('Sản phẩm đã được cập nhật số lượng giỏ hàng.', 'Đóng');
        });
      } else {
        // Nếu mục chưa tồn tại, tạo một mục mới với số lượng là 1
        const newCartItem = { CartID: 1, BookID: book.Id, Quantity: 1 };
        this.cartService.addCartItem(newCartItem).subscribe((addedCartItem) => {
          console.log('Mục mới đã được thêm vào giỏ hàng:', addedCartItem);
          this.snackbarService.showSnackbar('Sản phẩm đã được thêm vào giỏ hàng.', 'Đóng');
        });
      }
    });
  }
}
