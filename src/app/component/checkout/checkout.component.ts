import { Component, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkout } from 'src/app/service/checkout.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  UserID: number = 1;
  Username : string='dominhduc';
  FirstName: string= '';
  LastName : string='';
  Email :string='';
  Address :string='';
  PhoneNumber: number=0;
  StatusId: number=2;
  Orderday :Date = new Date();
  totalAmount : number=2;

  // formData = {
  //   UserID: '1',
  //   Username:'',
  //   FirstName:'',
  //   LastName :'',
  //   Email :'',
  //   Address :'',
  //   PhoneNumber: '',
  //   StatusId: '2',
  //   Orderdate: new Date(),
  //   totalAmount :''
  // }

  constructor(
    private renderer: Renderer2,
    private cartService: CartService,
    private checkout: checkout,
    // private http: HttpClient
  ) {}


  ngOnInit(): void {
    this.loadCart();
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/checkout.js';
    this.renderer.appendChild(document.body, script);
  }

  CreateCheckout():void{
    this.checkout.createCheckout(
      this.UserID,
      this.Username,
      this.FirstName,
      this.LastName,
      this.Email,
      this.Address,
      this.PhoneNumber,
      this.Orderday,
      this.StatusId,
      this.totalAmount
      ).subscribe(
      (response: any) => {

        console.log(this.totalAmount)
        console.log('Checkout created successfully', response);
        // Đặt bất kỳ xử lý nào sau khi tạo Checkout ở đây
      },
      (error: any) => {
        console.error(error);
        // Xử lý lỗi ở đây và hiển thị thông báo lỗi cho người dùng (errorMessage)
        console.error('Error creating checkout', error);
      }
    );
  }

  // onSubmit() {
  //   this.http.post('https://localhost:44302/api/checkouts', this.formData).subscribe(
  //     (response) => {
  //       console.log('Data sent successfully', response);
  //     },
  //     (error) => {
  //       console.error('Error sending data', error);
  //     }
  //   );
  // }



  loadCart() {
    // Gọi phương thức để lấy tất cả các mục trong giỏ hàng
    this.cartService.getAllCartItems().subscribe((data: any) => {
      this.cartItems = data;
      // Lặp qua danh sách các mục để lấy thông tin sách cho từng mục
      this.cartItems.forEach((cartItem) => {
        this.cartService.getBookInfoByCartItemID(cartItem.id).subscribe((bookInfo: any) => {
          // Lưu thông tin sách vào thuộc tính bookInfo của mục
          cartItem.bookInfo = bookInfo;
          cartItem.totalPrice = cartItem.bookInfo.Price * cartItem.Quantity;
          this.updateTotalPrice();
          this.updateTotalQuantity();
      });
    });
});
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
}
