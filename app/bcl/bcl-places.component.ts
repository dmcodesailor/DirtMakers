import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { DataListModule } from '../../node_modules/primeng/primeng';
import { DataList } from '../../node_modules/primeng/primeng';
import { SharedModule } from '../../node_modules/primeng/primeng';
import { DataTableModule } from '../../node_modules/primeng/primeng';
import { DataGrid, Column } from '../../node_modules/primeng/primeng';
import { InputTextModule } from '../../node_modules/primeng/primeng';
import { InputTextareaModule } from '../../node_modules/primeng/primeng';
import { DropdownModule, Dropdown } from '../../node_modules/primeng/primeng';
import { SelectItem } from '../../node_modules/primeng/primeng';

import { LoadingIndicator, LoadingPage } from '../shared/components/loading-indicator/loading-indicator';

import { Place, Planet, City, Station } from '../places/place';
import { PlaceType } from '../places/place-type';
import { PlacesService } from '../places/places.service';

@Component({
    selector: 'dm-bcl-places',
    templateUrl: 'app/bcl/bcl-places.component.html'
    , directives: [DataList, LoadingIndicator, Dropdown, Column,
    ]
    , providers: [PlacesService]
})
export class BclPlacesComponent extends LoadingPage implements OnInit {

    public planets:Place[] = new Array<Place>();
    public affiliations:SelectItem[] = [];
    public selectedAffiliation:String = "Gulu Farxad Adag";
    public selectedPlace:Place;

    constructor(private placesService:PlacesService) {
        super(true);
     }
    ngOnInit() {
        this.loadPlanets();
        this.loadAffiliations();
     }
    private loadPlanets() {
        this.placesService.getPlanets().toPromise().then((places:Place[]) => {
            this.planets = places; 
            this.loading = false;
        });        
    }
    private loadAffiliations() {
        this.affiliations.push({label: '--Select an Affiliation--', value: null});
        this.affiliations.push({label: 'Federation', value: "Federation"});
        this.affiliations.push({label: 'Alliance', value: "Alliance"});
        this.affiliations.push({label: 'Independent', value: "Independent"});
        this.affiliations.push({label: 'Nihon-Koku', value: "Nihon-Koku"});
        this.affiliations.push({label: 'Gulu Farxad Adag', value: "Gulu Farxad Adag"});
        this.affiliations.push({label: 'Expansion', value: "Expansion"});
    }
}