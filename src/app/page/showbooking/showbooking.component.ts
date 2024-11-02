import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-showbooking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './showbooking.component.html',
  styleUrls: ['./showbooking.component.scss'] // แก้เป็น styleUrls เพื่อให้ถูกต้องตาม Angular
})
export class ShowbookingComponent implements OnInit {
  bookings: any[] = [];
  errorMessage: string = '';
  isPaymentModalVisible: boolean = false;
  selectedBookingId: number | null = null;
  paymentSlipLink: string = '';

  constructor(private apiService: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBookings();
  }
  fetchBookings() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // ตรวจสอบว่ามีข้อมูลอีเมลและรหัสผ่านใน `user` หรือไม่
    if (!user.email || !user.password) {
        this.errorMessage = 'กรุณาเข้าสู่ระบบเพื่อดูข้อมูลการจอง';
        return;
    }

    // เรียกใช้ API เพื่อดึงข้อมูลการจอง
    this.apiService.getUserBookings(user.email, user.password).subscribe({
      next: (response: any) => {
        this.bookings = response.bookings || [];
        this.errorMessage = ''; // ล้างข้อความผิดพลาด
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'รหัสผ่านไม่ถูกต้อง กรุณาเข้าสู่ระบบใหม่อีกครั้ง';
          localStorage.removeItem('user'); // ลบข้อมูลผู้ใช้หากรหัสผ่านไม่ถูกต้อง
        } else {
          this.errorMessage = 'เกิดข้อผิดพลาดในการดึงข้อมูลการจอง';
        }
        console.error(error);
      }
    });
}


  cancelBooking(boothId: number) {
    this.apiService.cancelBooking(boothId).subscribe({
      next: () => {
        alert('การจองของคุณถูกยกเลิกเรียบร้อยแล้ว');
        this.fetchBookings();
      },
      error: (error) => {
        console.error('Error cancelling booking:', error);
        alert('ไม่สามารถยกเลิกการจองได้');
      }
    });
  }

  showPaymentModal(bookingId: number) {
    this.isPaymentModalVisible = true;
    this.selectedBookingId = bookingId;
  }

  hidePaymentModal() {
    this.isPaymentModalVisible = false;
    this.selectedBookingId = null;
    this.paymentSlipLink = '';
  }

  confirmPayment() {
    if (!this.paymentSlipLink || !this.selectedBookingId) {
      this.errorMessage = 'กรุณาวางลิงก์สลิปการชำระเงิน';
      return;
    }

    const payload = {
      booking_id: this.selectedBookingId,
      payment_slip: this.paymentSlipLink
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>(`/users/payment`, payload, { headers }).subscribe({
      next: (response) => {
        if (response.success) {
          alert(response.message || 'ชำระเงินสำเร็จ');
          this.fetchBookings();
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการชำระเงิน';
        console.error(error);
      }
    });

    this.hidePaymentModal();
  }
}
