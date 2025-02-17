import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-add',
  standalone: false,
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})

export class UserAddComponent {

   constructor(private userService: UserService, public dialogRef:MatDialogRef<UserAddComponent>) {}

   userName: string = '';
   password: string = '';
   confirmPassword: string = '';
   role: string = '';

  onSubmit(formValue: any) {

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Form Submitted:', formValue);
    this.userService.addUser(formValue).subscribe({
          next: (response) => {
            console.log('User added successfully', response);
            alert('User added successfully');
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error adding user', error);
            alert('Invalid User detail, Not added.');
          },
      });
}

  onCancel() {
    this.dialogRef.close(false);    // Close dialog without saving
  }
}

