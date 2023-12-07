import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CartDataService } from 'src/app/service/cartdata.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  isQuantityExceeded: boolean = false;

  constructor(
    private renderer: Renderer2,
    private cartService: CartService,
    private snackbarService: SnackbarService,
    private cartDataService: CartDataService

  ) { }

  ngOnInit(): void {
    this.loadCart();
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/cart.js';
    this.renderer.appendChild(document.body, script);
  
  }

  loadCart() {
    // Gọi phương thức để lấy tất cả các mục trong giỏ hàng
    this.cartService.getAllCartItems().subscribe((data: any) => {
      this.cartItems = data;
      // Lặp qua danh sách các mục để lấy thông tin sách cho từng mục
      this.cartItems.forEach((cartItem) => {
        this.cartService.getBookInfoByCartItemID(cartItem.id).subscribe((bookInfo: any) => {
          // Lưu thông tin sách vào thuộc tính bookInfo của mục
          cartItem.bookInfo = bookInfo;
          // Tính toán giá tiền cho mục này và lưu vào trường totalPrice
          cartItem.totalPrice = cartItem.bookInfo.Price * cartItem.Quantity;
          this.updateTotalPrice();
          this.updateTotalQuantity();
        });
      });
    });
  }



 updateCartItemQuantity(cartItem: any) {

  // Kiểm tra xem số lượng nhập vào có vượt quá số lượng tối đa không
  if (cartItem.Quantity > cartItem.bookInfo.Quantity) {
    
    console.log(cartItem.bookInfo.Quantity)
    // Hiển thị một thông báo lỗi hoặc thực hiện hành động phù hợp (ví dụ: không cho phép cập nhật)
    console.error('Số lượng nhập vào vượt quá số lượng tối đa.');
    this.snackbarService.showSnackbar('Số lượng mua vượt quá mức cho phép.', 'Đóng');
    this.isQuantityExceeded = true;
  } else {
    this.isQuantityExceeded = false;
    // Gọi phương thức để cập nhật số lượng sản phẩm trong giỏ hàng
    this.cartService.updateCartItemQuantity(cartItem).subscribe(
      (response) => {
        console.log('Số lượng sản phẩm đã được cập nhật thành công');
        this.snackbarService.showSnackbar('Bạn đã thêm số lượng sản phẩm.', 'Đóng');
        this.loadCart();
      },
      (error) => {
        console.error('Lỗi cập nhật số lượng sản phẩm:', error);
      }
    );
  }
}


  updateTotalQuantity() {
    this.totalQuantity = 0;
    for (const cartItem of this.cartItems) {
      if (cartItem.Quantity) {
        this.totalQuantity += cartItem.Quantity;
      }
    }
  }
  
  
  updateTotalPrice() {
    this.totalPrice = 0;
    for (const cartItem of this.cartItems) {
      if (cartItem.bookInfo && cartItem.Quantity) {
        this.totalPrice += cartItem.totalPrice;
      }
    }
  }
  
  deleteItemFromCart(itemId: number) {
    this.cartService.deleteCartItem(itemId).subscribe(
      (response) => {
        // Xử lý phản hồi nếu cần
        console.log('Mục đã được xóa thành công');
        // Sau khi xóa thành công, có thể làm các thao tác khác, ví dụ: cập nhật lại danh sách giỏ hàng
        this.loadCart();
      },
      (error) => {
        // Xử lý lỗi nếu có
        console.error('Lỗi xóa mục khỏi giỏ hàng:', error);
      }
    );
    this.snackbarService.showSnackbar('Sản phẩm đã được xóa khỏi giỏ hàng.', 'Đóng');
  }
  
}
