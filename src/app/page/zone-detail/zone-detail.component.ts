import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-zone-detail',
  standalone: true, 
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZoneDetailComponent implements OnInit {
  zones: any[] = [];
  booths: any[] = [];
  selectedZoneId: number | null = null;
  isBoothContainerVisible = false;
  showLoginDialog = false;
  showConfirmDialog = false;
  showNotDialog = false;
  showMaxNotDialog = false;
  selectedBooth: any;
  bookedBooths: any[] = []; 

  constructor(private apiService: ApiService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getZones().subscribe(
      (data) => {
        this.zones = data;
        console.log(this.zones);
      },
      (error) => {
        console.error('Error fetching zones:', error);
      }
    );
  }

  showBooths(zone_id: number) {
    this.isBoothContainerVisible = true;
    this.selectedZoneId = zone_id;
    this.apiService.getBoothsByZone(zone_id).subscribe((data) => {
      this.booths = data;
      console.log("Booths data:", data);
    },
    (error) => {
      console.error('Error fetching booths:', error);
    });
  }

  hideBooths() {
    this.isBoothContainerVisible = false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); 
  }

  bookBooth(booth_id: number, booth_name: string) {
    if (!this.isLoggedIn()) {
      this.showLoginDialog = true;

      return;
    }
  
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userData = {
      email: user.email,
      password: user.password,
      booth_id,
      booth_name,
    };
  
    this.apiService.checkBoothAvailability(userData).subscribe({
      next: (response: any) => {
        try {
          const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
          console.log("Parsed API response:", parsedResponse);
  
          if (parsedResponse.error === 'User has reached the maximum number of booth bookings (4)') {
            this.bookedBooths = parsedResponse.bookings || [];
            this.showMaxNotDialog = true;
            
          } else if (parsedResponse.status_booth === 'available' && parsedResponse.message === 'User can book this booth') {
            this.selectedBooth = { booth_id, booth_name };
            this.showConfirmDialog = true;
            console.log("แสดงการยืนยันการจอง showConfirmDialog:", this.showConfirmDialog);
          } 
          else if(parsedResponse.status_booth === 'available'){
            this.showMaxNotDialog = true;
          } else {
            alert(parsedResponse.message || 'บูธนี้ไม่พร้อมให้จอง');
            console.log("status_booth:", parsedResponse.status_booth);
            console.log("message:", parsedResponse.message);
          }
        } catch (e) {
          console.error('Error parsing JSON response:', e);
          alert('มีปัญหาในการแปลงข้อมูลจากเซิร์ฟเวอร์');
        }
      },
      error: (error: HttpErrorResponse) => {
        if (
          error.status === 409 && 
          error.error?.error === 'User has reached the maximum number of booth bookings (4)'
        ) {
          this.bookedBooths = error.error.bookings || [];
          this.showMaxNotDialog = true;
        } else {
          this.showNotDialog = true;
          console.log(error.status);
        }
      },
    });
  }
  

  ToNotbook() {
    this.showNotDialog = false; // ปิด dialog หรือแสดงข้อความอื่นๆ ตามที่ต้องการ
  }

  goToLogin() {
    this.showLoginDialog = false; // ปิด Dialog ก่อนนำทางไปหน้าล็อกอิน
    this.router.navigate(['/login']); // นำทางไปยังหน้าล็อกอิน
  }

  goToBooking() {
    if (this.selectedBooth) {
      localStorage.setItem('selectedBooth', JSON.stringify(this.selectedBooth));
      this.router.navigate(['/booking']);
      this.showConfirmDialog = false;
    }
  }
}
