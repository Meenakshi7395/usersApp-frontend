import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  standalone: false,
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})

export class UserAddComponent implements OnInit{

  userForm!: FormGroup;

   constructor( private formBuileder: FormBuilder, private userService: UserService) {}

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


  onSubmit() {
      if (this.userForm.invalid) {
      alert('Invalid Details');
      return;
    }

    const formValue = this.userForm.value;
    console.log(formValue);
  
    this.userService.addUser(formValue).subscribe({
      next: (response) => {
        console.log('User added successfully', response);
        alert('User added successfully');
        this.userForm.reset();         // Reset form on success
      },
      error: (error) => {
        console.error('Error adding user', error);
        alert('Invalid User details, Not added.');
      }
    });
}
}

