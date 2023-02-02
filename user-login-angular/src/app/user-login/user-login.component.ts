import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  ngOnInit(): void { }

  constructor(private httpClient: HttpClient, private router: Router) { }

  preview: string = '';
  username: any = '';
  password: any = '';
  log_id: number = 0;

  logInForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.username = this.logInForm.value.username;
    this.password = this.logInForm.value.password;
    this.httpClient.post('http://127.0.0.1:8000/api/login/', {username: this.username, password: this.password})
    .pipe(map((res: {[key: string]: any}) => {
      for (const key in res) {
        if (key == 'id') {
          this.log_id = res[key];
          localStorage.setItem('token', JSON.stringify(this.log_id));
        }
      }
    }))
    .subscribe((data) => {
      console.log(data); 
      this.router.navigate(['/home']);
      // if (data == 'already logged in') {
      //   this.router.navigate(['/signup']);
      // }
      // else {
      //   this.router.navigate(['/home']);
      // }
    });
  }
}
