import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-del-booth',
  standalone: true,
  imports: [ FormsModule ,CommonModule ],
  templateUrl: './del-booth.component.html',
  styleUrl: './del-booth.component.scss'
})
export class DelBoothComponent {

  booth = {
    booth_id: null,
    booth_name: ''
  };
  message: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>('https://wag16.bowlab.net/admin/booth_Delete', this.booth, { headers })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.message = 'ลบข้อมูลบูธสำเร็จ';
          }
        },
        error: (error) => {
          this.errorMessage = 'ไม่สามารถลบข้อมูลบูธได้';
          console.error(error);
        }
      });
  }

  onCancel() {
    this.router.navigate(['/booth']); // นำทางกลับไปยังหน้ารายการบูธ
  }
}
