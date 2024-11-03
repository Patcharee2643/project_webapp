import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.scss'
})
export class EditEventComponent implements OnInit {
  event: any = {
    event_id: '',
    event_name: '',
    event_start_date: '',
    event_end_date: ''
  };
  message: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEventDetails(eventId);
    }
  }

  loadEventDetails(eventId: string) {
    this.apiService.getEventDetails(eventId).subscribe({
      next: (data: any) => {
        this.event = data;
      },
      error: (error) => {
        console.error('Error loading event details:', error);
        this.message = 'ไม่พบข้อมูลงานนี้';
      }
    });
  }

  onSubmit() {
    this.apiService.updateEvent(this.event).subscribe({
      next: (response) => {
        this.message = 'บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว';
      },
      error: (error) => {
        console.error('Error updating event:', error);
        this.message = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
      }
    });
  }

  onCancel() {
    this.router.navigate(['/event']);
  }
}
