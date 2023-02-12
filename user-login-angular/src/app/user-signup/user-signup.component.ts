import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {

  constructor(private httpClient: HttpClient, private router: Router) {}

  hide = true;
  
  username: any = '';
  name: any = '';
  password: any = '';
  place: any = '';

  signUpForm = new FormGroup({
    name: new FormControl(''),
    bio: new FormControl(''),
    place: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  signUpUser(){
    console.log(this.signUpForm.value); 
    this.username = this.signUpForm.value.username;
    this.name = this.signUpForm.value.name;
    this.password = this.signUpForm.value.password;
    this.httpClient.post('http://127.0.0.1:8000/api/users/', {name: this.name, username: this.username, password: this.password})
    .subscribe((res) => {console.log(res); this.router.navigate(['/login']).then(()=> window.location.reload())});
  }
}
