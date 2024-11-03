import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-zone',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-zone.component.html',
  styleUrls: ['./edit-zone.component.scss']
})
export class EditZoneComponent {
  zone = {
    zone_id: null,
    event_id: null,
    zone_name: '',
    zone_description: '',
    max_booths: null
  };
  message: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  // ฟังก์ชันส่งข้อมูลการอัปเดตไปยัง API
  onSubmit() {
    this.http.post<any>('https://wag16.bowlab.net/admin/zone_Update', this.zone).subscribe({
      next: (response) => {
        this.message = 'Zone updated successfully';
      },
      error: (error) => {
        this.message = 'Failed to update zone';
        console.error('Error updating zone:', error);
      }
    });
  }
  onCancel() {
    this.router.navigate(['/zone']);
  }
}
