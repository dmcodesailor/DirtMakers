import { NgModule }                         from '@angular/core';

import { EditorModule }                     from 'primeng/primeng';

import { bclRouting }                       from './bcl.routing';
import { BclComponent }                     from './bcl.component';
import { BclPlacesComponent }               from './bcl-places.component';
import { DmSharedModule }                   from '../shared/dm-shared.module';
import { BclAffiliationsComponent }         from './bcl-affiliations.component';
import { BclAffiliationAdminService }       from './bcl-affiliation-admin.service';
import { BclNavComponent }                  from './bcl-nav.component';
import { BclPlacesListComponent }           from './bcl-places-list.component';
import { BclPlaceAdminService }             from './bcl-places-admin.service';
import { BclPlaceDetailsComponent }         from './bcl-place-details.component';

@NgModule({
    imports:        [
                        bclRouting
                        , DmSharedModule
                        , EditorModule
                    ],
    exports:        [
                        DmSharedModule
                        , EditorModule
                    ],
    declarations:   [
                        BclComponent
                        , BclPlacesComponent
                        , BclAffiliationsComponent
                        , BclNavComponent
                        , BclPlacesListComponent
                        , BclPlaceDetailsComponent
                    ],
    providers:      [
                        , BclAffiliationAdminService
                        , BclPlaceAdminService
                    ]
})
export class BclModule { }
