import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-add',
  standalone: false,
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})

export class UserAddComponent implements OnInit{

  userForm!: FormGroup;
 

   constructor( private formBuileder: FormBuilder, private userService: UserService,
     private snackBar: MatSnackBar,
     private router: Router,
      ) {}

   hidepassword = true;
    passwordVisibility(){
    this.hidepassword = !this.hidepassword;
  }

  hideConfirmPassword=true;
  confirmPasswordVisibility(){
    this.hideConfirmPassword= !this.hideConfirmPassword;
  }

   ngOnInit() {
    this.userForm = this.formBuileder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup:FormGroup){
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  return password === confirmPassword ? null :{mismatch:true};
  }

 
  
  showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration :2000,
      horizontalPosition: 'center',
      verticalPosition: 'top' 
      // panelClass: ['snackbar-style'] 
    });
  }

  onSubmit() {
      if (this.userForm.invalid) {
      // this.showSnackbar('Invalid Details','Close');
      return;
    }

    const formValue = this.userForm.value;
    console.log(formValue);
  
    this.userService.addUser(formValue).subscribe({
      next: (response) => {
        console.log('User added successfully', response);
        this.showSnackbar('User added successfully', 'Close')
        this.router.navigate(['/users']); 
        // this.userForm.reset(); 
        // alert('User added successfully');
               // Reset form on success
      },
      error: (error) => {
        console.error('Error adding user', error);
        this.showSnackbar('Invalid User details', 'Close')
        // alert('Invalid User details, Not added.');
      }
    });
}



}

