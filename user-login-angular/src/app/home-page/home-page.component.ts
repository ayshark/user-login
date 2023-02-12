import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';

export interface UserLogs {
  id: number;
  login_time: string;
  logout_time: string;
}

const userLogs: UserLogs[] = [
  {id: 1, login_time: 'something', logout_time: 'something else'},
  {id: 2, login_time: 'something', logout_time: 'something else'},
  {id: 3, login_time: 'something', logout_time: 'something else'},
]

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private router: Router, private httpClient: HttpClient, private authService: AuthService) {
    this.getUserLogs();
  }
  
  log_id: number = parseInt(localStorage.getItem('token')!);
  user_id: number = parseInt(localStorage.getItem('user_id')!);
  columnNames: string[] = ['id', 'login_time', 'logout_time'];
  logs: Object | any = [];

  logOut() {
    // this.httpClient.patch('http://127.0.0.1:8000/api/logout/', {id: this.log_id})
    // .subscribe(() => this.authService.loggedIn = false);
    // localStorage.removeItem('token');
    // this.router.navigate(['/login']);
    this.authService.logOut();
  }

  getUserLogs() {
    this.httpClient.get('http://127.0.0.1:8000/api/view-logs/' + this.user_id)
    .subscribe(res => this.logs = res);
  }
  

  
  
}
