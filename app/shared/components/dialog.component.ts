import { Component, OnInit, ViewChild } from '@angular/core';
import { Button } from 'primeng/primeng';
import { Dialog } from 'primeng/primeng';

@Component({
    selector: 'dialog-component'
    , templateUrl: 'app/shared/components/dialog.component.html'
    // , directives: [Button, Dialog]
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