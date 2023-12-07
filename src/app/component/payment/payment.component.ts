import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  // productName: string='';
  // productPrice: string='';
  cartItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService) {}

  ngOnInit(): void {
    
    //this.cartItems = this.cartService.getCartItems();
  
  }
  calculateTotal(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.Price; // Giả sử 'Price' là thuộc tính chứa giá của sản phẩm
    }
    return total;
  }
  
}
