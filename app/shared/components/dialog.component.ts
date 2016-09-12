import { Component, OnInit, ViewChild } from '@angular/core';
import { Button } from '../../../node_modules/primeng/primeng';
import { Dialog } from '../../../node_modules/primeng/primeng';

@Component({
    templateUrl: 'app/shared/components/dialog.component.html'
    , directives: [Button, Dialog]
    , selector: 'dialog-component'
})
export class DialogComponent implements OnInit {
    public display:boolean = false;

    ngOnInit() {
    }
    /**
     * 
     */
    public showDialog(message:string) {
       this.display = true;
    }
}