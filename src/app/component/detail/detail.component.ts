import { Component, OnInit, Renderer2 } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  book: any;
  quantity: number = 1;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private renderer: Renderer2,
    private router: Router,
    private cartService: CartService,
    private snackbarService: SnackbarService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = Number(params.get('id'));
      this.bookService.getBookById(bookId).subscribe(data => {
        this.book = data;
      });
    });
     // Tạo một thẻ script
     const script = this.renderer.createElement('script')
     // Đặt nguồn script (đường dẫn đến tệp JavaScript của bạn)
     script.src = 'assets/js/detail.js' // Thay đổi đường dẫn tương ứng
     // Thêm script vào DOM
     this.renderer.appendChild(document.body, script);
  }
  addToCart(book: any) {

    if (!this.authService.getIsLoggedIn()) {
      // Nếu người dùng chưa đăng nhập, chuyển họ đến trang đăng nhập
      this.router.navigate(['/login']);
      return; // Ngăn người dùng tiếp tục thực hiện thêm vào giỏ hàng
    }
    const defaultCartID = 1;

    // Gọi API để kiểm tra xem mục có trong giỏ hàng chưa
    this.cartService.getCartItemByBookID(book.Id).subscribe((cartItem: any) => {
      console.log('Cart item:', cartItem);

      if (cartItem) {
        // Nếu mục đã tồn tại, cập nhật số lượng
        cartItem.Quantity += this.quantity; // Cộng thêm số lượng từ input
        this.cartService.updateCartItemQuantity(cartItem).subscribe((updatedCartItem) => {
          console.log('Số lượng mục trong giỏ hàng đã được cập nhật:', updatedCartItem);
          this.snackbarService.showSnackbar('Sản phẩm đã được cập nhật số lượng giỏ hàng.', 'Đóng');
        });
      } else {
        // Nếu mục chưa tồn tại, tạo một mục mới với số lượng từ input
        const newCartItem = { CartID: 1, BookID: book.Id, Quantity: this.quantity };
        this.cartService.addCartItem(newCartItem).subscribe((addedCartItem) => {
          console.log('Mục mới đã được thêm vào giỏ hàng:', addedCartItem);
          this.snackbarService.showSnackbar('Sản phẩm đã được thêm vào giỏ hàng.', 'Đóng');
        });
      }
    });
  }
}
