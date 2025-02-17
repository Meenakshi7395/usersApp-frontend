import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: any = {
    userName: '',
    password: '',
    role: ''
  };

  userDetails: any;

  constructor(
    // private route: Router,
    private userService: UserService,
    private router: Router,
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {

  }

  ngOnInit(): void {
    if (this.userService.userDetails !== null) {
      this.userDetails = this.userService.userDetails;
      this.user = { ...this.userDetails };
    }
  }

  onSubmit() {
    this.userService.updateUser(this.user).subscribe({
      next: (response) => {
        console.log(response);
        alert('User updated successfully');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating user', error);
        alert('Failed to update user');
      }
    });
  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
