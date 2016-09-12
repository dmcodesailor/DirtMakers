import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/components/base.component';
import { Carousel } from '../../node_modules/primeng/primeng';
import { Place, Planet, City, Station } from './place';
import { PlaceType } from './place-type';
import { PlacesService } from './places.service';
import { Observable } from '../../node_modules/rxjs';
import {NgModule,ElementRef,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,Input,Output,IterableDiffers,TemplateRef,ContentChild,Renderer} from '@angular/core';
// import {DomHandler} from '../dom/domhandler';
// import {SharedModule} from '../common/shared';
import {CommonModule} from '@angular/common';
import { DataGrid, Column, CarouselModule } from '../../node_modules/primeng/primeng';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { DataTable } from '../../node_modules/primeng/primeng';
import { Button } from '../../node_modules/primeng/primeng';
import { Dialog } from '../../node_modules/primeng/primeng';

@Component({
    selector: 'dm-places'
    , templateUrl: 'app/places/places.component.html'
    , directives: [Carousel]
    , providers: [PlacesService]
})
export class PlacesComponent extends BaseComponent {
    
    public placesTypes:PlaceType[] = [];
    // public places:Place[] = new Array<Place>();

    constructor(private placesService:PlacesService) { 
        super(); 
        this.loadPlaceTypes();
    }

    private loadPlaceTypes () {
        this.placesService.getPlaceTypes().toPromise().then((pt:PlaceType[]) => this.placesTypes = pt);
    }

}