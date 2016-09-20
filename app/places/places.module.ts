import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
// import { routing, appRoutingProviders } from '../app.routing';
import { PlacesComponent }   from './places.component';
import { PlaceDetailsComponent } from './place-details.component';
import { PlacesService } from './places.service';
import { placesRouting } from './places.routing';
import { DataGridModule, Column, CarouselModule } from '../../node_modules/primeng/primeng';
import { DataTable } from '../../node_modules/primeng/primeng';
import { Button } from '../../node_modules/primeng/primeng';
import { Dialog } from '../../node_modules/primeng/primeng';
import { DataTableModule } from '../../node_modules/primeng/primeng';
import { SharedModule } from '../../node_modules/primeng/primeng';
import { DataListModule, DataList } from '../../node_modules/primeng/primeng';

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
