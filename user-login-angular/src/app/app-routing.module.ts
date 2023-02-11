import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router"
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthRouteGuard } from './Services/auth-route-guard.service';
import { UserLoginComponent } from "./user-login/user-login.component"
import { UserSignupComponent } from './user-signup/user-signup.component';


const routes: Routes = [
    {path: 'login', component: UserLoginComponent},
    {path: 'signup', component: UserSignupComponent, canActivate: [AuthRouteGuard]},
    {path: 'home', component: HomePageComponent, canActivate: [AuthRouteGuard]},
  ]
  
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
