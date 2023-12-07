import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://localhost:44302/api/books'; // Điều chỉnh URL của API

  constructor(private http: HttpClient) {}

  searchBooks(searchTerm: string) {
    return this.http.get(`${this.apiUrl}/search?query=${searchTerm}`);
}

  

  getAllBooks() {
    return this.http.get(this.apiUrl);
  }

  getBookById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createBook(book: any) {
    return this.http.post(this.apiUrl, book);
  }

  updateBook(id: number, book: any) {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
