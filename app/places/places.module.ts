import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
// import { routing, appRoutingProviders } from '../app.routing';
import { PlacesComponent }   from './places.component';
import { PlaceDetailsComponent } from './place-details.component';
import { PlacesService } from '../shared/services/places.service';
import { placesRouting } from './places.routing';
import { DataGridModule, Column, CarouselModule } from 'primeng/primeng';
import { DataTable } from 'primeng/primeng';
import { Button } from 'primeng/primeng';
import { Dialog } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { DataListModule, DataList } from 'primeng/primeng';

@NgModule({
    imports: [
        placesRouting
        , CarouselModule
        , DataTableModule
        , SharedModule
        , DataListModule
        // , DataList
    ],
    exports: [],
    declarations: [
            PlacesComponent
            , PlaceDetailsComponent
        ],
    providers: [
            Http
            , PlacesService
        ],
})
export class PlacesModule { 
}
