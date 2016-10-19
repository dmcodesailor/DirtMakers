import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { AppModule }    from './app.module';

@Component({
    template:''
})
export class LogoutComponent {
  constructor(public authService: AuthService, public router: Router) {
  }
  ngOnInit() {
      this.logout();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}