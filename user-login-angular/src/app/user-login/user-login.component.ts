import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserCredentials } from '../auth';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  ngOnInit(): void { }

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    // this.logInForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required],
    // })
    this.formvalue = {'username': '', 'password': ''};
  }

  logInForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  preview: string = '';
  formvalue: {username: string, password: string};

  logInUser(user: UserCredentials): void {
    this.authService.logIn(user.username, user.password).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error)
    });
  }

  onSubmit() {
    console.log(JSON.stringify(this.logInForm.value))
    if (this.logInForm.invalid) {
      console.log("fill the details");
    } else {
      console.log('no error')};
      this.formvalue = {username: JSON.stringify(this.logInForm.value.username), password: JSON.stringify(this.logInForm.value.password)};
      this.logInUser(this.formvalue);

    // console.log(JSON.stringify(this.logInForm.value))
  }

}
