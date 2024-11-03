import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-booth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-booth.component.html',
  styleUrls: ['./edit-booth.component.scss']
})
export class EditBoothComponent {
  booth = {
    booth_id: null,
    zone_id: null,
    booth_name: '',
    booth_size: '',
    products_sale: ''
  };
  message: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>('https://wag16.bowlab.net/admin/booth_Update', this.booth, { headers })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.message = 'บันทึกข้อมูลบูธสำเร็จ';
          }
        },
        error: (error) => {
          this.errorMessage = 'การอัปเดตข้อมูลบูธล้มเหลว';
          console.error(error);
        }
      });
  }

  onCancel() {
    this.router.navigate(['/booth']); // นำทางกลับไปยังหน้ารายการบูธ
  }
}
