import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private router: Router, private httpClient: HttpClient) { }
  
  id: number = parseInt(localStorage.getItem('token')!);

  logOut() {
    this.httpClient.patch('http://127.0.0.1:8000/api/logout/', {id: this.id})
    .subscribe((res) => {});
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
