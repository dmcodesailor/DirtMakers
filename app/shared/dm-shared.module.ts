import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule
          , NG_VALUE_ACCESSOR
          , ControlValueAccessor }      from '@angular/forms';
import { HttpModule }                   from '@angular/http';

import { MdInputModule }                from '@angular2-material/input';
import { MdProgressCircleModule }       from '@angular2-material/progress-circle';
import { MdButtonModule }               from '@angular2-material/button';

import { DataListModule }               from 'primeng/primeng';
import { DataList }                     from 'primeng/primeng';
import { SharedModule }                 from 'primeng/primeng';
import { DataTableModule }              from 'primeng/primeng';
import { InputTextModule }              from 'primeng/primeng';
import { InputTextareaModule }          from 'primeng/primeng';
import { DropdownModule, Dropdown }     from 'primeng/primeng';
import { SelectItem}                    from 'primeng/primeng';
import { AccordionModule }              from 'primeng/primeng';
import { DialogModule }                 from 'primeng/primeng';
import { MenuModule, MenuItem }         from 'primeng/primeng';
import { ButtonModule }                 from 'primeng/primeng';

import { DialogComponent }              from './components/dialog.component';
import { AffiliationService }           from './services/affiliation.service';
import { ConfigService }                from './services/config.service';
import { PlacesService }                from './services/places.service';

@NgModule({
  imports:        [ 
                    CommonModule
                    , DataTableModule 
                    , DataListModule
                    , InputTextModule
                    , InputTextareaModule
                    , DropdownModule
                    , MdInputModule
                    , MdProgressCircleModule
                    , MdButtonModule
                    , DialogModule
                    , ButtonModule
                    , SharedModule
                  ]
  , declarations: [ 
                    DialogComponent 
                  ]
  , exports:      [ 
                    CommonModule
                    , FormsModule
                    , DialogComponent
                    , AccordionModule
                    , HttpModule
                    , DataTableModule
                    , DataListModule
                    , InputTextModule
                    , InputTextareaModule
                    , DropdownModule
                    , MdInputModule
                    , MdProgressCircleModule
                    , MdButtonModule
                    , DialogModule
                    , ButtonModule
                    , SharedModule
                  ]
    , providers:  [
                    AffiliationService
                    , ConfigService
                    , PlacesService
                  ]
})
export class DmSharedModule { }