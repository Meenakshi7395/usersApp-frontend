import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}

  loginUser(formData:any){
    // console.log(formData);

    const { userName, password } = formData;
    
    if (userName === 'meenakshi' && password === '1234') {
      localStorage.setItem('user', JSON.stringify({ userName }));   // Store user in localStorage
      this.router.navigate(['/home']); 
    } else {
      alert('Invalid credentials!');
    }
  }

  }

