import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class checkout {
  private apiUrl = 'https://localhost:44302/api/checkouts';
  constructor(private http: HttpClient) {}
  private isCheckoutIn = false;
  private checkout: any;

  createCheckout(

    UserID:number,
    Username : string,
    FirstName: string,
    LastName : string,
    Email :string,
    Address :string,
    PhoneNumber: number,
    Orderday :Date= new Date,
    StatusId :number,
    totalAmount : number
    ): Observable<any> {

    const data = {
      UserID, Username, FirstName,LastName, Email,
      Address,PhoneNumber,Orderday,StatusId,totalAmount };
    return this.http.post(`${this.apiUrl}`, data).pipe(
      // Xử lý phản hồi từ API sau khi đăng nhập thành công
      tap((checkout: any) => {
        // Lưu thông tin người dùng và đặt trạng thái nhập Form checkout là true
        this.checkout = checkout;
        this.isCheckoutIn = true;
      })
    );;
  }


}
