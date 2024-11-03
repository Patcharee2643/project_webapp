import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-zone',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.scss']  // แก้ไขให้ถูกต้องเป็น styleUrls
})
export class AddZoneComponent {

  zone = {
    zone_name: '',
    zone_description: '',
    max_booths: null,
    event_id: null
  };
  message: string = '';

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {}

  onSubmit() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>('https://wag16.bowlab.net/admin/zoneInsert', this.zone, { headers })
      .subscribe({
        next: (response) => {
          console.log('Zone added successfully:', response);
          this.message = 'Zone added successfully!';
        },
        error: (error) => {
          console.error('Error adding zone:', error);
          if (error.status === 0) {
            alert('Unable to connect to the server. Please check your internet connection or CORS settings.');
          } else {
            alert(`Server responded with status ${error.status}: ${error.message}`);
          }
        }
      });
  }

  onCancel() {
    this.router.navigate(['/zone']);
  }
}
