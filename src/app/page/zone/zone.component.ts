import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss'
})
export class ZoneComponent {
  constructor(private router: Router) {}
  toAddZone(){
  
    this.router.navigate(['/addZone']); 
  }
  toEditZone(){
  
    this.router.navigate(['/editZone']); 
  }
  toDelZone(){
  
    this.router.navigate(['/delZone']); 
  }
}
