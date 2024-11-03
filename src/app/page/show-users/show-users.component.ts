import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [CommonModule,CommonModule ],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.scss'
})
export class ShowUsersComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้';
      }
    });
  }
}