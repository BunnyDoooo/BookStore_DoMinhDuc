import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
 
  private apiUrl = 'https://localhost:44302/api/inventory'; // Đảm bảo cập nhật URL của API

  constructor(private http: HttpClient) {}

  getAllInventory() {
    return this.http.get(this.apiUrl);
  }

  getInventoryById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createInventory(inventoryItem: any) {
    return this.http.post(this.apiUrl, inventoryItem);
  }

  updateInventory(id: number, inventoryItem: any) {
    return this.http.put(`${this.apiUrl}/${id}`, inventoryItem);
  }

  deleteInventory(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getInventoryQuantity(bookId: number) {
  return this.http.get(`${this.apiUrl}/quantity/${bookId}`);
}

}
