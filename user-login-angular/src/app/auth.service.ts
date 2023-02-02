import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedInUser } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logIn(username: string, password: string) {
    return this.http.post('http://127.0.0.1:8000/api/login/', {username: username, password: password})
  }

  logOut(username: string) {
    return this.http.patch('http://127.0.0.1:8000/api/login/', {username: username, has_logged_out: true})
  }
}
