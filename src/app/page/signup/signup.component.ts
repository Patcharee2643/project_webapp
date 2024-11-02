import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  prefix: string = '';
  first_name: string = '';
  last_name: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    const userData = {
      prefix: this.prefix,
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
      email: this.email,
      password: this.password
    };

    this.apiService.registerUser(userData).subscribe({
      next: (response) => {
        alert('สมัครสมาชิกสำเร็จ!');
        this.router.navigate(['/login']); // เปลี่ยนไปหน้า Login หลังสมัครสมาชิก
      },
      error: (error) => {
        if (error.status === 409) {
          alert('อีเมลนี้ถูกใช้ไปแล้ว');
        } else {
          alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
        }
      }
    });
  }

  
}