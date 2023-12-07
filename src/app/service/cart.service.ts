
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:44302/api/cartitems'; // Điều chỉnh URL của API

  constructor(private http: HttpClient) {}
  getAllCartItems() {
    return this.http.get(this.apiUrl);
  }

  //Thêm một mục vào giỏ hàng
  addCartItem(cartItem: any): Observable<any> {
    return this.http.post(this.apiUrl, cartItem);
  }

  //Cập nhật một mục trong giỏ hàng
  updateCartItem(cartItem: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cartItem.id}`, cartItem);
  }

  // Xóa một mục khỏi giỏ hàng bằng ID
  deleteCartItem(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Tìm kiếm tên sản phẩm
  getBookInfoByCartItemID(cartItemID: number) {
    return this.http.get<any>(`${this.apiUrl}/getbookinfo/${cartItemID}`);
  }
  updateCartItemQuantity(cartItem: any): Observable<any> {
    // Gửi yêu cầu PUT để cập nhật số lượng sản phẩm cho cartItem
    return this.http.put(`${this.apiUrl}/${cartItem.id}`, cartItem);
  }
  getCartItemByBookID(bookID: number): Observable<any> {
    // Gọi method GET để lấy cartItem dựa trên BookID
    return this.http.get<any>(`${this.apiUrl}/getcartitembybookid/${bookID}`);
  }
  
  
}





