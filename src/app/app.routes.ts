import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ImageButtonComponent } from './image-button/image-button.component';
import { ZoneDetailComponent } from './page/zone-detail/zone-detail.component';
import { SignupComponent } from './page/signup/signup.component';
import { BookingComponent } from './page/booking/booking.component';
import { ShowbookingComponent} from './page/showbooking/showbooking.component';
import { AdminComponent} from './page/admin/admin.component';
import {AddEventComponent} from './page/add-event/add-event.component';
import {EditEventComponent } from './page/edit-event/edit-event.component';
import {EventComponent } from './page/event/event.component';
import { ZoneComponent} from './page/zone/zone.component';
import { AddZoneComponent } from './page/add-zone/add-zone.component';
import { EditZoneComponent} from './page/edit-zone/edit-zone.component';
import { DelZoneComponent} from './page/del-zone/del-zone.component';
import { BoothComponent} from './page/booth/booth.component';
import { AddBoothComponent } from './page/add-booth/add-booth.component';
import { EditBoothComponent} from './page/edit-booth/edit-booth.component';
import { DelBoothComponent} from './page/del-booth/del-booth.component';

import { UserComponent } from './page/user/user.component';
import {UserBookConfirmComponent } from './page/user-book-confirm/user-book-confirm.component';
import {ShowUsersComponent} from './page/show-users/show-users.component';
import {  ShowUnpaidUsersComponent} from './page/show-unpaid-users/show-unpaid-users.component';
import {  ShowPaidUsersComponent } from './page/show-paid-users/show-paid-users.component';
import { ShowPendingBoothComponent } from './page/show-pending-booth/show-pending-booth.component';
import {ShowBookingsBoothComponent} from './page/show-bookings-booth/show-bookings-booth.component';


export const routes: Routes = [
    {path: '', component: ZoneDetailComponent},
    { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }, // เส้นทางสำหรับหน้าโปรไฟล์
  { path: 'booking', component: BookingComponent},
  { path: 'showbooking', component: ShowbookingComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'event',component: EventComponent},
  { path: 'addEvent', component: AddEventComponent },
  { path: 'editEvent', component: EditEventComponent },
  { path: 'zone',component: ZoneComponent},
  { path: 'addZone', component: AddZoneComponent },
  { path: 'editZone', component: EditZoneComponent },
  { path: 'delZone', component: DelZoneComponent},
  { path: 'booth',component: BoothComponent},
  { path: 'addBooth', component: AddBoothComponent},
  { path: 'editBooth', component: EditBoothComponent },
  { path: 'delBooth', component: DelBoothComponent},
  
  { path: 'user', component: UserComponent },
  { path: 'book_Confirm', component: UserBookConfirmComponent},
  { path: 'show_users', component: ShowUsersComponent },
  { path: 'show_unpaid_users',component: ShowUnpaidUsersComponent },
  { path: 'show_paid_users', component: ShowPaidUsersComponent },
  { path: 'show_pending_booth', component:ShowPendingBoothComponent },
  { path: 'show_bookings_booth', component: ShowBookingsBoothComponent},
       
];
