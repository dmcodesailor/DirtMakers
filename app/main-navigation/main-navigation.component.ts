import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/components/base.component';

@Component({
    selector: 'main-nav',
    templateUrl: 'app/main-navigation/main-navigation.component.html'
})
export class MainNavigationComponent extends BaseComponent {
    constructor() { 
        super();
    }
}