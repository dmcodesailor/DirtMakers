import { NgModule } from '@angular/core';

import { bclRouting }               from './bcl.routing';
import { BclComponent }             from './bcl.component';
import { BclPlacesComponent }       from './bcl-places.component';
import { DmSharedModule }           from '../shared/dm-shared.module';
import { PlacesService }            from'../places/places.service';

@NgModule({
    imports:        [
                        bclRouting
                        , DmSharedModule
                    ],
    exports:        [
                        DmSharedModule
                    ],
    declarations:   [
                        BclComponent
                        , BclPlacesComponent
                    ],
    providers:      [
                        PlacesService
                    ]
})
export class BclModule { }
