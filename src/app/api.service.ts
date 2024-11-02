import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

getUserBookings(email: string, password: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<any>(`${this.baseUrl}/users/book_data`, { email, password }, { headers })
    .pipe(
      catchError(error => {
        console.error('Error fetching user bookings:', error);
        return throwError(() => error);
      })
    );
}




cancelBooking(boothId: number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/users/cancelled_book_booth`, { boothId });
}

payForBooking(boothId: number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/users/payment`, { boothId });
}


}
