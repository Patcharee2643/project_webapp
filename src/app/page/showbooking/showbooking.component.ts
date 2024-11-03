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
    console.log('User data from localStorage:', user);
  
    if (!user.email || !user.password) {
      this.errorMessage = 'กรุณาเข้าสู่ระบบเพื่อดูข้อมูลการจอง';
      return;
    }
  
    this.apiService.getUserBookings(user.email, user.passwordreal).subscribe({
      next: (response: any) => {
        console.log('Response bookings:', response.bookings);
        this.bookings = response.bookings || [];
        this.errorMessage = ''; // เคลียร์ข้อความผิดพลาดหากดึงข้อมูลสำเร็จ
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'รหัสผ่านไม่ถูกต้อง กรุณาเข้าสู่ระบบใหม่อีกครั้ง';
        } else {
          this.errorMessage = 'เกิดข้อผิดพลาดในการดึงข้อมูลการจอง';
        }
        console.error(error);
      }
    });
  }
  
  


  cancelBooking(bookingId: number, boothId: number) {
    if (boothId === undefined || boothId === null) {
      console.error('booth_id is undefined or null'); 
      this.errorMessage = 'ไม่พบข้อมูลบูธ กรุณาลองใหม่อีกครั้ง';
      return;
    }
  
    const payload = { booking_id: bookingId, booth_id: boothId };
    console.log('Payload for cancellation:', payload);
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.post<any>('https://wag16.bowlab.net/users/cancelled_book_booth', payload, { headers }).subscribe({
      next: (response) => {
        if (response.success) {
          alert('การจองถูกยกเลิกเรียบร้อยแล้ว');
          this.fetchBookings();
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการยกเลิกการจอง';
        console.error('Error in cancellation:', error);
      }
    });
  }
  
  
  

  showPaymentModal(bookingId: number) {
    this.isPaymentModalVisible = true;
    this.selectedBookingId = bookingId; // กำหนด bookingId ให้กับ selectedBookingId
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
  
    // เปลี่ยน URL ให้ชี้ไปที่เซิร์ฟเวอร์จริง
    this.http.post<any>(`https://wag16.bowlab.net/users/payment`, payload, { headers }).subscribe({
      next: (response) => {
        if (response.success) {
          alert(response.message || 'ชำระเงินสำเร็จ');
          this.fetchBookings();
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการชำระเงิน';
        console.error(error);
        alert('ไม่สามารถชำระเงินได้');
      }
    });
  
    this.hidePaymentModal();
  }
  
  
}
