import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../Services/signin.services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private router: Router, private httpClient: HttpClient, private signin: SignInService) { }

  id: number = this.signin.log_id;
  // token: string | null = localStorage.getItem('token');

  logOut() {
    this.httpClient.patch('http://127.0.0.1:8000/api/logout/', {id: this.id})
    .subscribe((res) => {});
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
