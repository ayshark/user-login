import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {

  constructor(private httpClient: HttpClient) {}

  hide = true;
  
  username: string = '';
  name: string = '';
  bio: string = '';
  place: string = '';

  signUpForm = new FormGroup({
    name: new FormControl(''),
    bio: new FormControl(''),
    place: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  signUpUser(){
    console.log(JSON.stringify(this.signUpForm.value)); 
    this.username = JSON.stringify(this.signUpForm.value.username);
    this.name = JSON.stringify(this.signUpForm.value.name);
    this.bio = JSON.stringify(this.signUpForm.value.bio);
    this.place = JSON.stringify(this.signUpForm.value.place);
    this.httpClient.post('http://127.0.0.1:8000/api/users', {username: this.username, name: this.name, bio: this.bio, place: this.place})
    .subscribe((res) => {});
  }
}
