import { Injectable }               from '@angular/core';
import { CanActivate
         , Router
         , ActivatedRouteSnapshot
         , RouterStateSnapshot
         , CanLoad
         , CanActivateChild
         , Route }                  from '@angular/router';
import { AuthService }              from './auth.service';

// referenced the following for this: https://medium.com/@blacksonic86/angular-2-authentication-revisited-611bf7373bf9#.x4391hmxd

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService
            , private router: Router) {}

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.isAuthenticated(url);
  }

    canActivate(route: ActivatedRouteSnapshot
            , state: RouterStateSnapshot) {
      return this.isAuthenticated(state.url);    
    }

    // private isAuthenticated(route: ActivatedRouteSnapshot
    //         , state: RouterStateSnapshot):boolean {
    private isAuthenticated(url:string):boolean {
    if (this.authService.isLoggedIn) { 
      return true; 
    } else {
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;

      // Navigate to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}