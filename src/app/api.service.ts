import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://wag16.bowlab.net';
  private loginUrl = `${this.baseUrl}/users/login1`;
  private updateUrl = `${this.baseUrl}/users/update`;
  private boothsUrl = `${this.baseUrl}/users/booths`;
  private zonesUrl = `${this.baseUrl}/zones/booths`;
  private checkBookBoothUrl = `${this.baseUrl}/users/checkbook_booth`;
  private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public isLoggedIn = this.loggedIn.asObservable();
  constructor(private http: HttpClient) {}
  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('user'); // ตรวจว่ามีข้อมูลผู้ใช้ใน localStorage หรือไม่
  }
   
  
    // ฟังก์ชันสำหรับการออกจากระบบ
    logout() {
      localStorage.removeItem('user'); // ลบข้อมูลผู้ใช้ออกจาก localStorage
      this.loggedIn.next(false); // เปลี่ยนสถานะเป็นออกจากระบบ
    }
  // ปรับฟังก์ชัน login เพื่อรับ FormData
  login(loginData: FormData): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginData);
  }
  
  updateUser(userData: any): Observable<any> {
    return this.http.post<any>(this.updateUrl, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getZones(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/zones`);
  }

  getBooths(): Observable<any> {
    return this.http.get<any>(this.boothsUrl);
  }

  getBoothsByZone(zone_id: number): Observable<any> {
    return this.http.get<any>(`${this.zonesUrl}/${zone_id}`);
  }

  checkBoothAvailability(userData: any): Observable<any> {
    return this.http.post<any>(this.checkBookBoothUrl, userData, { responseType: 'text' as 'json' });
}

registerUser(userData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/users/register`, userData);
}



setLoginStatus(status: boolean) {
  this.loggedIn.next(status);
}

bookBooth(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/book_booth`, bookingData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'json' as const // ตรวจสอบให้ตั้งเป็น json
    });
}
bookBoothAPI(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/users/book_booth`, data, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
}
getUserBookings(email: string, password: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<any>(`${this.baseUrl}/users/book_data`, { email, password }, { headers })
    .pipe(
      tap((response: any) => { // ใช้ tap เพื่อดูข้อมูล response โดยไม่แก้ไขข้อมูลที่ส่งออกไป
        console.log('API response:', response);
      }),
      catchError(error => {
        console.error('Error fetching user bookings:', error);
        return throwError(() => error); // ส่งค่า error ให้ subscriber ใช้จัดการ
      })
    );
}





cancelBooking(boothId: number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/users/cancelled_book_booth`, { boothId });
}

payForBooking(boothId: number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/users/payment`, { boothId });
}

checkMaxBooking(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/users/maxbook_booth`, data, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
}


addEvent(eventData: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<any>(`${this.baseUrl}/admin/eventInsert`, eventData, { headers });
}

getEventDetails(eventId: string): Observable<any> {
  const payload = { event_id: eventId };
  return this.http.post<any>(`${this.baseUrl}/admin/event_Update`, payload);
}

updateEvent(eventData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/admin/event_Update`, eventData);
}

addZone(zone: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<any>(`${this.baseUrl}/zoneInsert`, zone, { headers });
}
getUnpaidUsers(): Observable<any[]> {
  return this.http.get<any[]>('https://wag16.bowlab.net/admin/show_unpaid_users');
}

getUsers(): Observable<any[]> {
  return this.http.get<any[]>('https://wag16.bowlab.net/admin/show_users');
}

getPaidUsers(): Observable<any[]> {
  return this.http.get<any[]>('https://wag16.bowlab.net/admin/show_paid_users');
}
getPendingUsers(): Observable<any[]> {
  return this.http.get<any[]>('https://wag16.bowlab.net/admin/show_pending_booth');
}
getBookedBooths(): Observable<any[]> {
  return this.http.get<any[]>('https://wag16.bowlab.net/admin/show_bookings_booth1');
}


}
