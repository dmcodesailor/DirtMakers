import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/components/base.component';
import { HabHygService } from '../shared/services/habhyg.service';
import { StarData } from '../shared/models/star.data';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MdButtonModule } from '@angular2-material/button';
import { DataTable } from 'primeng/primeng';
import { Column } from 'primeng/primeng';
import { Button } from 'primeng/primeng';
import { Dialog } from 'primeng/primeng';
import { DialogComponent } from '../shared/components/dialog.component';
import { ButtonModule } from 'primeng/primeng';

@Component({
    selector: 'dm-habhyg-detail',
    templateUrl: 'app/habhyg-detail/habhyg-detail.component.html'
    // , directives: [MdButtonModule, DataTable, Column, Button, Dialog, DialogComponent]
    // , directives: [ DialogComponent ]
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