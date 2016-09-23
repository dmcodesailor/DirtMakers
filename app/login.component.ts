import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './shared/services/auth.service';
@Component({
  template: `
    <h2>LOGIN</h2>
    <p>{{message}}</p>
    <p>
      <input type='text' placeholder='username' *ngIf='!authService.isLoggedIn' [(ngModel)]='username'/>
      <br/>
      <input type='text' placeholder='password' *ngIf='!authService.isLoggedIn' [(ngModel)]='password'/>
      <br/>
      <button (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
      <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
    </p>
    `
})
export class LoginComponent {
  message: string;
  public username:string;
  public password:string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login() {
    this.message = 'Trying to log in ...';
    this.authService.login(this.username, this.password).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/bcl';
        // Redirect the user
        console.log(redirect);
        this.router.navigate([redirect]);
      }
    });
  }
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}