import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserAddComponent } from '../user-add/user-add.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
    users: any[] = [];
    selectedUser: any = { id: null, userName: '', password: '', confirmPassword: '', role: '' };
    isEditing = false;
  
    constructor(private userService: UserService, private router : Router, private dialog: MatDialog, private snackBar: MatSnackBar) {}
  
    showSnackbar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration:1500,
        horizontalPosition: 'center',
        verticalPosition: 'top' 
        // panelClass: ['snackbar-style'] 
      });
    }
    
    ngOnInit() {
      this.loadUsers();
    }
  
    loadUsers() {
      this.userService.getUsers().subscribe((data) => {
        this.users = data;
      });
    }
    displayedColumns: string[] = ['index', 'userName', 'password', 'role', 'actions']
    
    editUser(user: any) {
      console.log(user);
      this.userService.userDetails = user;
      const dialogRef = this.dialog.open(UserEditComponent, {
        width: '400px',
        disableClose: true
      });
    
      dialogRef.afterClosed().subscribe(result  => {
        console.log(result);
        if (result) {
          this.loadUsers();
        }
      });
    }
    
  deleteUser(id: number) {
      console.log(id);
      if (confirm('You want to delete this?')) {
        this.userService.deleteUser(id).subscribe({
          next: (response) => {
            this.showSnackbar('User deleted successfully','Close');
            this.users = this.users.filter(user => user.id !== id);   //remove user from list immediately
          },
          error: (error) => {
            if(error.status === 200){
              this.users = this.users.filter(user => user.id !== id)    //remove user from UI
            }else{
              this.showSnackbar(`Failed to delete user: ${error.message}`,'Close');
            }
          },
        });
      }
    }

    // openAddUserDialog() {
    //   const dialogRef = this.dialog.open(UserAddComponent, {
    //     width: '400px',
    //   });
  
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       console.log(result);
    //       this.loadUsers(); // Refresh user list if a user was added
    //     }
    //   });
    // }

  }
  