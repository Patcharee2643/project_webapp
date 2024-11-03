import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(private router: Router) {}
  tobook_Confirm(){
  
    this.router.navigate(['/book_Confirm']); 
  }
  toshow_users(){
  
    this.router.navigate(['/show_users']); 
  }
  toshow_unpaid_users(){
  
    this.router.navigate(['/show_unpaid_users']); 
  }
  toshow_paid_users(){
  
    this.router.navigate(['/show_paid_users']); 
  }
  show_pending_booth(){
  
    this.router.navigate(['/show_pending_booth']); 
  }
  toshow_bookings_booth(){
  
    this.router.navigate(['/show_bookings_booth']); 
  }
}
