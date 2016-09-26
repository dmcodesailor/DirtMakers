import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { DataListModule }                   from 'primeng/primeng';
import { DataList }                         from 'primeng/primeng';
import { SharedModule }                     from 'primeng/primeng';
import { DataTableModule }                  from 'primeng/primeng';
import { DataGrid, Column }                 from 'primeng/primeng';
import { InputTextModule }                  from 'primeng/primeng';
import { InputTextareaModule }              from 'primeng/primeng';
import { DropdownModule }                   from 'primeng/primeng';
import { SelectItem }                       from 'primeng/primeng';

import {MdButtonModule}                     from '@angular2-material/button/button';
import {MdProgressCircleModule}             from '@angular2-material/progress-circle/progress-circle';
import {MdInputModule}                      from '@angular2-material/input/input';

import { BaseComponent }                    from '../shared/components/base.component';
import { Place, Planet, City, Station }     from '../places/place';
import { PlaceType }                        from '../places/place-type';
import { PlacesService }                    from '../places/places.service';
import { DmSharedModule }                   from '../shared/dm-shared.module';

@Component({
    selector: 'dm-bcl-place-editor',
    templateUrl: 'app/bcl/bcl-place-editor.component.html'
})
export class BclPlaceEditorComponent extends BaseComponent implements OnInit {

    public planets:Place[] = new Array<Place>();
    public affiliations:SelectItem[] = [];
    public habhygChoices:SelectItem[] = [];
    public selectedAffiliation:String = "Gulu Farxad Adag";
    public selectedPlace:Place;
    public loading:boolean = true;

    constructor(private route:ActivatedRoute
                , private router:Router
                , private placesService:PlacesService) {
        super();
     }
    ngOnInit() {
        this.loadPlanets();
        this.loadAffiliations();
     }

    private loadPlanets() {
        this.placesService.getPlanets().toPromise().then((places:Place[]) => {
            this.planets = places; 
            // this.loading = false;
            this.selectPlaceFromRoute();
        });        
    }
    private loadAffiliations() {
        this.affiliations.push({label: '-- Choose --', value: null});
        this.affiliations.push({label: 'Alliance', value: "Alliance"});
        this.affiliations.push({label: 'Expansion', value: "Expansion"});
        this.affiliations.push({label: 'Federation', value: "Federation"});
        this.affiliations.push({label: 'Gulu Farxad Adag', value: "Gulu Farxad Adag"});
        this.affiliations.push({label: 'Independent', value: "Independent"});
        this.affiliations.push({label: 'Nihon-Koku', value: "Nihon-Koku"});
    }

    private selectPlaceFromRoute() {
         this.route.params.forEach((params: Params) => {
            let id = +params['id']; // (+) converts string 'id' to a number
            let place:Place = this.planets.find(p => p.id == id);
            this.selectPlace(place);
        });
    }

    private selectPlace(place:Place) {
        this.loading = false;
        this.selectedPlace = place;
    }
}