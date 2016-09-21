import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule
          , NG_VALUE_ACCESSOR
          , ControlValueAccessor }  from '@angular/forms';
import { HttpModule }               from '@angular/http';
// import { BrowserModule }            from '@angular/platform-browser';
import { AccordionModule }          from 'primeng/primeng';

import { Dialog }                   from '../../node_modules/primeng/primeng';
import { DialogComponent }          from './components/dialog.component';
// import { HighlightDirective }  from './highlight.directive';

@NgModule({
  imports:      [ CommonModule ]
  , declarations: [ Dialog, DialogComponent ]
  , exports:      [ CommonModule
                , FormsModule
                , DialogComponent
                // , BrowserModule
                , AccordionModule
                , HttpModule]
})
export class DmSharedModule { }