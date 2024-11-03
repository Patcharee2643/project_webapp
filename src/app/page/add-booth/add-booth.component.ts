import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-booth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-booth.component.html',
  styleUrls: ['./add-booth.component.scss']
})
export class AddBoothComponent {
  booth = {
    zone_name: '',
    booth_name: '',
    booth_size: '',
    price: null,
    image_url: ''
  };
  message: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // ฟังก์ชันสำหรับส่งข้อมูลการเพิ่มบูธไปยัง API
  onSubmit() {
    this.http.post<any>('https://wag16.bowlab.net/admin/Insertbooth', this.booth).subscribe({
      next: (response) => {
        this.message = 'Booth added successfully';
        this.errorMessage = '';
        this.resetForm();
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Zone not found';
        } else if (error.status === 400) {
          this.errorMessage = 'Cannot add booth, maximum booths reached';
        } else {
          this.errorMessage = 'Failed to add booth';
        }
        this.message = '';
        console.error('Error adding booth:', error);
      }
    });
  }

  resetForm() {
    this.booth = {
      zone_name: '',
      booth_name: '',
      booth_size: '',
      price: null,
      image_url: ''
    };
  }
  onCancel() {
    this.router.navigate(['/booth']);
  }
}
