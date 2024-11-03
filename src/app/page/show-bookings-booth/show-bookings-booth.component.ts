import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-show-bookings-booth',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './show-bookings-booth.component.html',
  styleUrl: './show-bookings-booth.component.scss'
})
export class ShowBookingsBoothComponent implements OnInit {
  bookedBooths: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getBookedBooths();
  }

  getBookedBooths() {
    this.apiService.getBookedBooths().subscribe({
      next: (data: any[]) => {
        this.bookedBooths = data;
      },
      error: (error) => {
        console.error('Error fetching booked booths:', error);
        this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลบูธที่ถูกจอง';
      }
    });
  }
}
