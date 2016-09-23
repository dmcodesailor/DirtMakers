import { Component, OnInit, ViewChild } from '@angular/core';
import { MdButtonModule } from '@angular2-material/button';
import { Button } from 'primeng/primeng';
import { Dialog } from 'primeng/primeng';
import { DialogComponent } from '../../shared/components/dialog.component';

export class BaseComponent implements OnInit {
    @ViewChild(DialogComponent) dialog:DialogComponent;     
    ngOnInit() {
    }
    protected showDialog(message:string) {
        this.dialog.showDialog(message);
    }
}