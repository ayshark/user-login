import { Component } from '@angular/core';
import { SignInService } from './Services/signin.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SignInService]
})
export class AppComponent {
  title = 'user-login';
}
