import { Routes }           from '@angular/router';
import { AuthGuard }        from './shared/services/auth-guard.service';
import { AuthService }      from './shared/services/auth.service';
import { LoginComponent }   from './login.component';
import { LandingPageComponent }         from './landing-page/landing-page.component';
import { LogoutComponent }   from './logout.component';

export const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
  , { path: 'logout', component: LogoutComponent }
];
export const authProviders = [
  AuthGuard,
  AuthService
];