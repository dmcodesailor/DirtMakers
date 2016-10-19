import { AuthService }                  from './auth.service';
export class BaseService {
    public authenticationService:AuthService;
    constructor (authService:AuthService) {
        this.authenticationService = authService;
        this.authenticationService.logoutEvent.subscribe( (msg:string) => {
            this.handleLogout(msg);
        });
    }
    public handleLogout(message:string) {
        console.log(message);
    }
}