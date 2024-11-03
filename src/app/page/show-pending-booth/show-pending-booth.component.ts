import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-pending-booth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './show-pending-booth.component.html',
  styleUrl: './show-pending-booth.component.scss'
})
export class ShowPendingBoothComponent implements OnInit {
  pendingUsers: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPendingUsers();
  }

  getPendingUsers() {
    this.apiService.getPendingUsers().subscribe({
      next: (data: any[]) => {
        this.pendingUsers = data;
      },
      error: (error) => {
        console.error('Error fetching pending users:', error);
        this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ที่รอตรวจสอบ';
      }
    });
  }
}