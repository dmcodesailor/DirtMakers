import { NgModule } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { routing, appRoutingProviders } from '../app.routing';
import { PlacesComponent }   from './places.component';
import { PlaceDetailsComponent } from './place-details.component';
import { PlacesService } from './places.service';
import { placesRouting } from './places.routing';
import { DataGrid, Column, CarouselModule } from '../../node_modules/primeng/primeng';
import { DataTable } from '../../node_modules/primeng/primeng';
import { Button } from '../../node_modules/primeng/primeng';
import { Dialog } from '../../node_modules/primeng/primeng';

@NgModule({
    imports: [
        placesRouting
        , CarouselModule
    ],
    exports: [],
    declarations: [
            PlacesComponent
            , PlaceDetailsComponent
        ],
    providers: [
            HTTP_PROVIDERS
            , PlacesService
        ],
})
export class PlacesModule { 
    public static id = "Places";
}
