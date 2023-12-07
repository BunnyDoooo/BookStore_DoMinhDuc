import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(message: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 3000, // Thời gian hiển thị Snackbar (3 giây)
      horizontalPosition: 'end', // Vị trí ngang
      verticalPosition: 'bottom', // Vị trí dọc
      
    });
  }
}