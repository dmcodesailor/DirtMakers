import { Component, OnInit } from '@angular/core';
// import { NgModule,ElementRef,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,Input,Output,IterableDiffers,TemplateRef,ContentChild,Renderer} from '@angular/core';
import { CommonModule} from '@angular/common';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { Observable } from '../../node_modules/rxjs';

import { DataGrid, Column, CarouselModule } from '../../node_modules/primeng/primeng';
import { Carousel } from '../../node_modules/primeng/primeng';
import { DataTable } from '../../node_modules/primeng/primeng';
import { Button } from '../../node_modules/primeng/primeng';
import { Dialog } from '../../node_modules/primeng/primeng';
// import {InputText} from 'primeng/primeng';
// import {Password} from 'primeng/primeng';
// import {ROUTER_DIRECTIVES} from '@angular/router';
// import {SplitButton} from 'primeng/primeng';
// // import {SplitButtonItem} from '../../node_modules/primeng/primeng';
// import {Checkbox} from 'primeng/primeng';
// import {RadioButton} from 'primeng/primeng';
// import {Dropdown} from 'primeng/primeng';
// import {SelectItem} from 'primeng/primeng';
// import {Editor} from 'primeng/primeng';
// import {Header} from 'primeng/primeng';
// import {TabView} from 'primeng/primeng';
// import {TabPanel} from 'primeng/primeng';
// import {Message} from 'primeng/primeng';
// import {Listbox} from 'primeng/primeng';
// import {ProgressBar} from 'primeng/primeng';

import { BaseComponent } from '../shared/components/base.component';
import { Place, Planet, City, Station } from './place';
import { PlaceType } from './place-type';
import { PlacesService } from './places.service';

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