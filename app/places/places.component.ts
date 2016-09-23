import { Component, OnInit } from '@angular/core';
// import { NgModule,ElementRef,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,Input,Output,IterableDiffers,TemplateRef,ContentChild,Renderer} from '@angular/core';
import { CommonModule} from '@angular/common';
import { MdButtonModule } from '@angular2-material/button';
import { Observable } from 'rxjs';

import { DataGrid, Column, CarouselModule } from 'primeng/primeng';
import { Carousel } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataList } from 'primeng/primeng';
import { Button } from 'primeng/primeng';
import { Dialog } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';

import { BaseComponent } from '../shared/components/base.component';
import { Place, Planet, City, Station } from './place';
import { PlaceType } from './place-type';
import { PlacesService } from './places.service';

@Component({
    selector: 'dm-places'
    , templateUrl: 'app/places/places.component.html'
    // , directives: [Carousel, DataList]
    , providers: [PlacesService]
})
export class PlacesComponent extends BaseComponent {
    
    public placesTypes:PlaceType[] = [];
    public planets:Place[] = new Array<Place>();
    public cities:Place[] = new Array<Place>();
    public stations:Place[] = new Array<Place>();

    constructor(private placesService:PlacesService) { 
        super(); 
        this.loadPlaceTypes();
        this.loadPlanets();
        this.loadCities();
        this.loadStations();
    }

    private loadPlaceTypes () {
        this.placesService.getPlaceTypes().toPromise().then((pt:PlaceType[]) => this.placesTypes = pt);
    }

    private loadPlanets() {
        this.placesService.getPlanets().toPromise().then((places:Place[]) => this.planets = places);        
    }

    private loadCities() {
        this.placesService.getCities().toPromise().then((places:Place[]) => this.cities = places);
    }

    private loadStations() {
        this.placesService.getStations().toPromise().then((places:Place[]) => this.stations = places);
    }
}