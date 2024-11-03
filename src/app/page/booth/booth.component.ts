import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booth',
  standalone: true,
  imports: [],
  templateUrl: './booth.component.html',
  styleUrl: './booth.component.scss'
})
export class BoothComponent {
  constructor(private router: Router) {}
  toAddBooth(){
  
    this.router.navigate(['/addBooth']); 
  }
  toEditBooth(){
  
    this.router.navigate(['/editBooth']); 
  }
  toDelBooth(){
  
    this.router.navigate(['/delBooth']); 
  }
}
