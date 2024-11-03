import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-del-zone',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './del-zone.component.html',
  styleUrl: './del-zone.component.scss'
})
export class DelZoneComponent {

  zone = {
    zone_id: null,
    zone_name: ''
  };
  message: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  // ฟังก์ชันสำหรับส่งข้อมูลการลบไปยัง API
  onDelete() {
    this.http.post<any>('https://wag16.bowlab.net/admin/zone_Delete', this.zone).subscribe({
      next: (response) => {
        this.message = 'Zone deleted successfully';
        this.errorMessage = '';
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Zone not found';
        } else {
          this.errorMessage = 'Failed to delete zone';
        }
        this.message = '';
        console.error('Error deleting zone:', error);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/zone']);
  }
}
