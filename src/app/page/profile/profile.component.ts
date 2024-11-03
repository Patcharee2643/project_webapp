import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  editableUser: any = {};
  newPassword: string = '';
  confirmPassword: string = '';
  isEditMode: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  objectKeys = Object.keys;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
    this.editableUser = { ...this.user };
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.editableUser = { ...this.user };
      this.newPassword = '';
      this.confirmPassword = '';
      this.successMessage = '';
      this.errorMessage = '';
    }
  }

  saveChanges() {
    // ตรวจสอบความถูกต้องของรหัสผ่านใหม่
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
  
    const updateData = { ...this.editableUser };
    // ส่งเฉพาะรหัสผ่านใหม่ไปยัง API เมื่อผู้ใช้ตั้งค่าไว้
    if (this.newPassword) {
      updateData.password = this.newPassword;
    } else {
      delete updateData.password; // ไม่ส่งฟิลด์ password หากไม่มีการตั้งค่ารหัสผ่านใหม่
    }
    this.apiService.updateUser(updateData).subscribe(
      (response) => {
        if (response.success) {
          this.user = { ...this.editableUser };
          if (this.newPassword) {
            this.user.password = response.updatedPasswordHash || this.user.password;
          }
          localStorage.setItem('user', JSON.stringify(this.user));
          this.isEditMode = false;
          this.successMessage = 'User information updated successfully';
        } else {
          this.errorMessage = response.error;
        }
      },
      (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage = 'Failed to update user information.';
      }
    );
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editableUser = { ...this.user };
    this.newPassword = '';
    this.confirmPassword = '';
    this.successMessage = '';
    this.errorMessage = '';
  }

  isEditableField(field: string): boolean {
    return ['prefix', 'first_name', 'last_name', 'phone', 'email'].includes(field);
  }

  filteredObjectKeys(obj: any): string[] {
    return Object.keys(obj).filter(key => key !== 'passwordreal');
  }
  
  
}
