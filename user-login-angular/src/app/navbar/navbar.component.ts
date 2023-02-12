import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private authService: AuthService) {}

  isLoggedIn$: Observable<boolean> ;

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isAuthenticated();
  }

  // isLoggedIn = this.authService.isAuthenticated(); // how to update this variable every time a user logs in or out
}
