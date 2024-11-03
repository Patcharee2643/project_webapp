import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-image-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-button.component.html',
  styleUrl: './image-button.component.css'
})
export class ImageButtonComponent implements OnInit {
  isDropdownVisible = false;
  AdminLoggedIn = false;
  isLoggedIn = false;
  username: string | null = null;
  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
  onButtonClick() {
    this.router.navigate([ImageButtonComponent]);
  }
  goToHome() {
    this.router.navigate(['']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }

  checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.email) {
      this.isLoggedIn = true;
      this.username = user.first_name; // หรือใช้ชื่ออื่นที่ได้จากข้อมูลการล็อกอิน
    } else {
      this.isLoggedIn = false;
      this.username = null;
    }
  }

  logout() {
    this.AdminLoggedIn = false;
    this.apiService.logout();
    this.router.navigate(['']); // กลับไปหน้า login
  }
  toProfile() {
    
    this.router.navigate(['/profile']); // กลับไปหน้า login
  }

  toBooking() {
    
    this.router.navigate(['/showbooking']); // กลับไปหน้า login
  }
  toEvent() {
    
    this.router.navigate(['/event']); // กลับไปหน้า login
    this.AdminLoggedIn = true;
  }

  toAdmin() {
    
    this.router.navigate(['/admin']); // กลับไปหน้า login
    this.AdminLoggedIn = true;
  }
  toAddEvent() {
    // ฟังก์ชันนี้จะนำทางไปยังหน้าการเพิ่มข้อมูล
    // เช่น this.router.navigate(['/event/add']);
  }

  toEditEvent() {
    // ฟังก์ชันนี้จะนำทางไปยังหน้าการแก้ไขข้อมูล
    // เช่น this.router.navigate(['/event/edit']);
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }


  toZone() {
    
    this.router.navigate(['/zone']); // กลับไปหน้า login
    
  }
  toBooth() {
    
    this.router.navigate(['/booth']); // กลับไปหน้า login
    
  }
  toUser() {
    
    this.router.navigate(['/user']); // กลับไปหน้า login
    
  }
}
