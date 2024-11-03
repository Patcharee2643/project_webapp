import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-show-paid-users',
  standalone: true,
  imports: [ FormsModule,CommonModule ],
  templateUrl: './show-paid-users.component.html',
  styleUrl: './show-paid-users.component.scss'
})
export class ShowPaidUsersComponent implements OnInit {
  paidUsers: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPaidUsers();
  }

  getPaidUsers() {
    this.apiService.getPaidUsers().subscribe({
      next: (data: any[]) => {
        this.paidUsers = data;
      },
      error: (error) => {
        console.error('Error fetching paid users:', error);
        this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ที่ชำระเงินแล้ว';
      }
    });
  }
}