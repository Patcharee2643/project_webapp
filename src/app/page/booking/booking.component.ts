import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  selectedBooth: any;
  email = '';
  password = '';
  event_id: number | null = null;
  booth_id: number | null = null;
  booth_name = '';
  start_date = '';
  end_date = '';
  products_sale = '';
  errorMessage = '';
  successMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const storedBooth = localStorage.getItem('selectedBooth');
    this.selectedBooth = storedBooth ? JSON.parse(storedBooth) : null;

    if (this.selectedBooth) {
        // กำหนดค่าข้อมูลที่จำเป็นให้กับฟอร์มจากข้อมูลบูธที่เลือก
        this.booth_id = this.selectedBooth.booth_id;
        this.booth_name = this.selectedBooth.booth_name;
    }
}

  onBookBooth() {
    const bookingData = {
      email: this.email,
      password: this.password,
      event_id: this.event_id,
      booth_id: this.booth_id,
      booth_name: this.booth_name,
      start_date: this.start_date,
      end_date: this.end_date,
      products_sale: this.products_sale
    };

    this.apiService.bookBooth(bookingData).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = response.success;
          this.errorMessage = '';
        } else {
          this.errorMessage = response.error;
          this.successMessage = '';
        }
      },
      (error) => {
        console.error('Booking failed:', error);
        this.errorMessage = 'Booking failed, please try again later.';
        this.successMessage = '';
      }
    );
  }

  bookSelectedBooth() {
    if (this.selectedBooth) {
      // ทำการจองบูธตามข้อมูลที่ดึงมา
      console.log('กำลังจองบูธ:', this.selectedBooth);
      // เพิ่มโค้ดสำหรับการจองจริงผ่าน API ที่นี่
    }
  }
}