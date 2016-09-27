import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './shared/services/auth.service';
@Component({
  templateUrl: '/app/login.component.html'
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
        this.router.navigate([redirect]);
      }
    });
  }
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}