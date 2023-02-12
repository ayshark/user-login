import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoggedInUser } from './auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  log_id: any;

  constructor(private httpClient: HttpClient, private router: Router) { }

  loggedIn: boolean = false;

  isAuthenticated() {
    return this.loggedIn;
  }

  logIn(username: string, password: string) {
    this.httpClient.post('http://127.0.0.1:8000/api/login/', {username: username, password: password})
    .pipe(map((res: {[key: string]: any}) => {
      for (const key in res) {
        if (key == 'id') {
          this.log_id = res[key];
          localStorage.setItem('token', JSON.stringify(this.log_id));
          localStorage.setItem('user_id', JSON.stringify(res['user']))
        }
      }
    }))
    .subscribe((data) => {
      console.log(data); 
      this.loggedIn = true;
      this.router.navigate(['/home']);
    })
  }

  logOut() {
    this.loggedIn = false;
    this.httpClient.patch('http://127.0.0.1:8000/api/logout/', {id: this.log_id})
    .subscribe(() => this.loggedIn = false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  
}
