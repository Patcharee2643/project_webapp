import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-unpaid-users',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './show-unpaid-users.component.html',
  styleUrl: './show-unpaid-users.component.scss'
})
export class ShowUnpaidUsersComponent implements OnInit {
  unpaidUsers: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUnpaidUsers();
  }

  getUnpaidUsers() {
    this.apiService.getUnpaidUsers().subscribe({
      next: (data: any[]) => {
        this.unpaidUsers = data;
      },
      error: (error) => {
        console.error('Error fetching unpaid users:', error);
        this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้';
      }
    });
  }
}