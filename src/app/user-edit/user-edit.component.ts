import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {

  }

  hidepassword = true;
    passwordVisibility(){
    this.hidepassword = !this.hidepassword;
  }
  
  showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top' 
      // panelClass: ['snackbar-style'] 
    });
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
        this.showSnackbar('User updated successfully','Close');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating user', error);
        this.showSnackbar('Failed to update user','Close');
      }
    });
  }
  onCancel() {
    this.user = { ...this.userDetails };
    this.dialogRef.close(false);
  }
}
