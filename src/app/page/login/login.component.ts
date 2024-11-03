import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginErrorMessage: string = ''; // ใช้แสดงข้อความแจ้งเตือนเมื่อเข้าสู่ระบบไม่สำเร็จ

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      alert('กรุณาใส่อีเมลและรหัสผ่าน');
      return;
    }

    const loginData = new FormData();
    loginData.append('email', this.email);
    loginData.append('password', this.password);

    this.apiService.login(loginData).subscribe(
      (response) => {
        if (response.success) {
          localStorage.setItem('user', JSON.stringify({ ...response.user, passwordreal: this.password }));
          this.router.navigate(['']);
          this.loginErrorMessage = ''; 
          this.apiService.setLoginStatus(true); 
      } else {
          this.loginErrorMessage = 'Email หรือ Password ไม่ถูกต้อง';
      }
      
      },
      (error) => {
        console.error('Login failed:', error);
        this.loginErrorMessage = 'ไม่สามารถเข้าสู่ระบบได้ โปรดลองใหม่อีกครั้ง'; // แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด
      }
    );
  }

  toSignup() {
    this.router.navigate(['/signup']);
  }
}
