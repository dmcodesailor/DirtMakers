import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { BaseComponent }        from '../shared/components/base.component';
@Component({
    selector: 'dm-bcl-nav',
    templateUrl: 'app/bcl/bcl-nav.component.html'
})
export class BclNavComponent extends BaseComponent implements OnInit {
    constructor(private router:Router) { super(); }
    ngOnInit() { }
    private gotoPlaces(link:string) {
        this.router.navigate(['bcl/places', {cat: link}]);
    }
}