import { NgModule }                         from '@angular/core';

import { bclRouting }                       from './bcl.routing';
import { BclComponent }                     from './bcl.component';
import { BclPlacesComponent }               from './bcl-places.component';
import { DmSharedModule }                   from '../shared/dm-shared.module';
import { PlacesService }                    from'../places/places.service';
import { BclAffiliationsComponent }         from './bcl-affiliations.component';
import { BclAffiliationAdminService }       from './bcl-affiliation-admin.service';

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
                        , BclAffiliationsComponent
                    ],
    providers:      [
                        PlacesService
                        , BclAffiliationAdminService
                    ]
})
export class BclModule { }
