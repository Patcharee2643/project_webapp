import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ApiService } from '../../api.service';
@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {
  eventData = {
    event_name: '',
    event_start_date: '',
    event_end_date: ''
  };
  successMessage = '';
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  onSubmit() {
    this.apiService.addEvent(this.eventData).subscribe({
      next: (response) => {
        this.successMessage = response.success;
      },
      error: (error) => {
        this.errorMessage = error.error || 'An error occurred while adding the event.';
      }
    });
  }
}