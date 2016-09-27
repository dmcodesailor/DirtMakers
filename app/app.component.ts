import { Component }                from '@angular/core';
import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { DmSharedModule }           from './shared/dm-shared.module';
import { AuthService }              from './shared/services/auth.service';
import { MenuModule, MenuItem }     from 'primeng/primeng';
import { FormsModule
          , NG_VALUE_ACCESSOR
          , ControlValueAccessor }  from '@angular/forms';
import { SharedModule }             from 'primeng/primeng';
import { ButtonModule, Button, SplitButton, SplitButtonModule }     from 'primeng/primeng';

import { OnInit } from '@angular/core';
import { Router }      from '@angular/router';

import { DataListModule } from 'primeng/primeng';
import { DataList } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DataGrid, Column } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { DropdownModule, Dropdown } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'dm-app',
    templateUrl:'app/app.component.html'
})
export class AppComponent {
    private items: MenuItem[];
    constructor(public authService:AuthService
                , private router:Router) {
    }

    ngOnInit() {
        this.items = [
            {label: 'About', icon: 'fa-info'}
            , {label: 'News', icon: 'fa-newspaper-o'}
            , {label: 'Contact', icon: 'fa-commenting-o'}
        ];
        this.setAdminMenuItem();
    }

    private setAdminMenuItem () {
            this.items.push({label: 'Logout', icon: 'fa-sign-out', command: (event) => {
                this.router.navigate(['/logout']);
            }})
            this.items.push({label: 'Admin', icon: 'fa-first-order', command: (event) => {
                this.router.navigate(['/bcl']);
            }})
    }

    public authentic():boolean {
        return this.authService.isLoggedIn;
    }

    public logout() {
        this.authService.logout();
    }
}