import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { AccordionModule } from 'primeng/primeng';
import { DataListModule } from '../../node_modules/primeng/primeng';
import { DataList } from '../../node_modules/primeng/primeng';
import { SharedModule } from '../../node_modules/primeng/primeng';
import { DataTableModule } from '../../node_modules/primeng/primeng';
import { InputTextModule } from '../../node_modules/primeng/primeng';
import { InputTextareaModule } from '../../node_modules/primeng/primeng';
import { DropdownModule, Dropdown } from '../../node_modules/primeng/primeng';
import { SelectItem} from '../../node_modules/primeng/primeng';

import { bclRouting } from './bcl.routing';
import { BclComponent }   from './bcl.component';

@NgModule({
    imports: [
        AccordionModule
        , DataListModule
        , DataTableModule
        , CommonModule
        , InputTextModule
        , InputTextareaModule
        , DropdownModule
        , FormsModule
        , bclRouting
    ],
    exports: [],
    declarations: [BclComponent],
    providers: [],
})
export class BclModule { }
