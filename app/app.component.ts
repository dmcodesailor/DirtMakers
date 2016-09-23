import { Component }        from '@angular/core';
import { DmSharedModule }   from './shared/dm-shared.module';
import { AuthService }      from './shared/services/auth.service';
@Component({
    selector: 'dm-app',
    templateUrl:'app/app.component.html'
})
export class AppComponent {
    constructor(public authService:AuthService) {

    }

    public authentic():boolean {
        return this.authService.isLoggedIn;
    }

    public logout() {
        this.authService.logout();
    }
}