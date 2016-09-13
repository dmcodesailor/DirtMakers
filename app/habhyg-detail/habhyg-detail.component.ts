import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/components/base.component';
import { HabHygService } from '../shared/services/habhyg.service';
import { StarData } from '../shared/models/star.data';
import { Router, RouterConfig, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from '../../node_modules/rxjs';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { DataTable } from '../../node_modules/primeng/primeng';
import { Column } from '../../node_modules/primeng/primeng';
import { Button } from '../../node_modules/primeng/primeng';
import { Dialog } from '../../node_modules/primeng/primeng';
import { DialogComponent } from '../shared/components/dialog.component';
import { ButtonModule } from 'primeng/primeng';

@Component({
    selector: 'dm-habhyg-detail',
    templateUrl: 'app/habhyg-detail/habhyg-detail.component.html'
    , directives: [MD_BUTTON_DIRECTIVES, DataTable, Column, Button, Dialog, DialogComponent]
    , providers: [HabHygService]
})
export class HabHygDetailComponent extends BaseComponent  {
    public star:StarData = new StarData();
    private sub: Subscription;

    constructor(private route: ActivatedRoute
                , private router: Router
                , private service: HabHygService) { 
        super();
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.service.getItem(id).subscribe((data:StarData[]) => { 
                                        let selectedStar:StarData = data.find((v:StarData, i:number) => v.id == id);
                                        this.star = selectedStar; 
                                    });            
            // .toPromise().then((sd:StarData) => {
            //     console.log(sd);
            //     // this.star = sd;
            // });
        });
    }

    ngOnDestroy () {
        this.sub.unsubscribe();
    }
}