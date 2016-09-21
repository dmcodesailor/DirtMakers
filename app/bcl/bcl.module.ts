import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// import { HttpModule } from '@angular/http';

// import { AccordionModule }          from 'primeng/primeng';
import { DataListModule }           from '../../node_modules/primeng/primeng';
import { DataList }                 from '../../node_modules/primeng/primeng';
import { SharedModule }             from '../../node_modules/primeng/primeng';
import { DataTableModule }          from '../../node_modules/primeng/primeng';
import { InputTextModule }          from '../../node_modules/primeng/primeng';
import { InputTextareaModule }      from '../../node_modules/primeng/primeng';
import { DropdownModule, Dropdown } from '../../node_modules/primeng/primeng';
import { SelectItem}                from '../../node_modules/primeng/primeng';

import { MdInputModule }            from '../../node_modules/@angular2-material/input';
import { MdProgressCircleModule }   from '../../node_modules/@angular2-material/progress-circle';
import { MdButtonModule }           from '../../node_modules/@angular2-material/button';
import { DialogComponent }          from '../shared/components/dialog.component';

import { bclRouting }               from './bcl.routing';
import { BclComponent }             from './bcl.component';
import { BclPlacesComponent }       from './bcl-places.component';
import { DmSharedModule }           from '../shared/dm-shared.module';
import { PlacesService }            from'../places/places.service';

@NgModule({
    imports: [
        // AccordionModule
        DataListModule
        , DataTableModule
        // , CommonModule
        , InputTextModule
        , InputTextareaModule
        , DropdownModule
        // , FormsModule
        , MdInputModule
        , MdProgressCircleModule
        , MdButtonModule
        , bclRouting
        // , HttpModule
        , DmSharedModule
    ],
    exports: [
        DmSharedModule
    ],
    declarations: [BclComponent, BclPlacesComponent],
    providers: [
        PlacesService
    ],
})
export class BclModule { }
