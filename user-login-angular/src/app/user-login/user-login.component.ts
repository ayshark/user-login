import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserCredentials } from '../auth';
import { SignInService } from '../Services/signin.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  ngOnInit(): void { }

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router, private signin: SignInService) { }

  preview: string = '';
  username: any = '';
  password: any = '';
  log_id: number = this.signin.log_id;

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
          this.signin.updateLogId(this.log_id);
          localStorage.setItem('token', this.log_id.toString());
        }
      }
    }))
    .subscribe((data) => {
      console.log(data); 
      // localStorage.setItem('token', JSON.stringify(res.valueOf(token)));
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
