import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ImageButtonComponent } from './image-button/image-button.component';
import { ZoneDetailComponent } from './page/zone-detail/zone-detail.component';
import { SignupComponent } from './page/signup/signup.component';
import { BookingComponent } from './page/booking/booking.component';
import { ShowbookingComponent} from './page/showbooking/showbooking.component';

export const routes: Routes = [
    {path: '', component: ZoneDetailComponent},
    { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }, // เส้นทางสำหรับหน้าโปรไฟล์
  { path: 'booking', component: BookingComponent},
  { path: 'showbooking', component: ShowbookingComponent}
];
