import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users'; // Backend API URL
  userDetails: any | null = null;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  deleteUser(id: number): Observable<void> {
    console.log(id); 
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  

}
