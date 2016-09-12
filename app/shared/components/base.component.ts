import { Component, OnInit, ViewChild } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { Button } from '../../../node_modules/primeng/primeng';
import { Dialog } from '../../../node_modules/primeng/primeng';
import { DialogComponent } from '../../shared/components/dialog.component';

export class BaseComponent implements OnInit {
    @ViewChild(DialogComponent) dialog:DialogComponent;     
    ngOnInit() {
    }
    protected showDialog(message:string) {
        this.dialog.showDialog(message);
    }
}