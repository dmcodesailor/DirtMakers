import { Component, OnInit } from '@angular/core';
import { HabHygService } from '../shared/services/habhyg.service';
import { StarData } from '../shared/models/star.data';
import { MdButtonModule } from '@angular2-material/button';
import { DataTable } from '../../node_modules/primeng/primeng';
import { Observable } from '../../node_modules/rxjs';
import { Column } from '../../node_modules/primeng/primeng';
import { Button } from '../../node_modules/primeng/primeng';
import { Dialog } from '../../node_modules/primeng/primeng';
import { BaseComponent } from '../shared/components/base.component';
import { DialogComponent } from '../shared/components/dialog.component';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/primeng';

@Component({
    selector: 'habhyg-data',
    templateUrl: 'app/data-editor-habhyg/data-editor-habhyg.component.html'
    // , directives: [MdButtonModule, DataTable, Column, Button, Dialog, DialogComponent]
    , providers: [HabHygService, StarData]
})
export class DataEditorHabHygComponent extends BaseComponent {
    public starData:StarData[] = [];
    public errorMessage:string;

    constructor(private dirtMakerService:HabHygService
                , private router:Router) { 
        super();
    }

    ngOnInit() {
        this.GetData();
     }

    private GetData() {
        // this.starData = this.dirtMakerService.get();
        this.dirtMakerService.get().toPromise().then(sd => {
            this.starData = sd; 
        });
    }

    onSelect (star:StarData) {
        if (star != null) {
            console.log("routing to " + star.ProperName);
            this.router.navigate(['/star', star.id] );
        }
    }
}