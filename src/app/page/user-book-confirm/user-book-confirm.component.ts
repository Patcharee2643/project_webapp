import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-book-confirm',
  standalone: true,
  imports: [ CommonModule ,FormsModule ],
  templateUrl: './user-book-confirm.component.html',
  styleUrl: './user-book-confirm.component.scss'
})
export class UserBookConfirmComponent {

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onConfirmBookings() {
    this.http.post<any>('https://wag16.bowlab.net/admin/book_Confirm', {})
      .subscribe({
        next: (response) => {
          this.successMessage = response.success;
          this.errorMessage = response.errors;
        },
        error: (error) => {
          console.error('Error confirming bookings:', error);
          this.errorMessage = error.error?.error;
        }
      });
  }
}

