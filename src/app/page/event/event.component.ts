import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  constructor(private router: Router) {}
  toAddEvent(){
  
    this.router.navigate(['/addEvent']); 
  }
  toEditEvent(){
  
    this.router.navigate(['/editEvent']); 
  }
}
