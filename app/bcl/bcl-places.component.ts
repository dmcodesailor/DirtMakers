import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataListModule } from '../../node_modules/primeng/primeng';
import { DataList } from '../../node_modules/primeng/primeng';
import { SharedModule } from '../../node_modules/primeng/primeng';
import { DataTableModule } from '../../node_modules/primeng/primeng';
import { DataGrid, Column } from '../../node_modules/primeng/primeng';
import { InputTextModule } from '../../node_modules/primeng/primeng';
import { InputTextareaModule } from '../../node_modules/primeng/primeng';
import { DropdownModule, Dropdown } from '../../node_modules/primeng/primeng';
import { SelectItem } from '../../node_modules/primeng/primeng';

// import {MdButtonToggleModule} from '@angular2-material/button-toggle/button-toggle';
import {MdButtonModule} from '@angular2-material/button/button';
// import {MdCheckboxModule} from '@angular2-material/checkbox/checkbox';
// import {MdRadioModule} from '@angular2-material/radio/radio';
// import {MdSlideToggleModule} from '@angular2-material/slide-toggle/slide-toggle';
// import {MdSliderModule} from '@angular2-material/slider/slider';
// import {MdSidenavModule} from '@angular2-material/sidenav/sidenav';
// import {MdListModule} from '@angular2-material/list/list';
// import {MdGridListModule} from '@angular2-material/grid-list/grid-list';
// import {MdCardModule} from '@angular2-material/card/card';
// import {MdIconModule} from '@angular2-material/icon/icon';
import {MdProgressCircleModule} from '@angular2-material/progress-circle/progress-circle';
// import {MdProgressBarModule} from '@angular2-material/progress-bar/progress-bar';
import {MdInputModule} from '../../node_modules/@angular2-material/input/input';
// import {MdTabsModule} from '@angular2-material/tabs/tabs';
// import {MdToolbarModule} from '@angular2-material/toolbar/toolbar';
// import {MdTooltipModule} from '@angular2-material/tooltip/tooltip';
// import {MdRippleModule} from '@angular2-material/core/ripple/ripple';
// import {PortalModule} from '@angular2-material/core/portal/portal-directives';
// import {OverlayModule} from '@angular2-material/core/overlay/overlay-directives';
// import {MdMenuModule} from '@angular2-material/menu/menu';
// import {RtlModule} from '@angular2-material/core/rtl/dir';

// import { LoadingIndicator, LoadingPage } from '../shared/components/loading-indicator/loading-indicator';

import { BaseComponent } from '../shared/components/base.component';
import { Place, Planet, City, Station } from '../places/place';
import { PlaceType } from '../places/place-type';
import { PlacesService } from '../places/places.service';

@Component({
    selector: 'dm-bcl-places',
    templateUrl: 'app/bcl/bcl-places.component.html'
    // , directives: [DataList, LoadingIndicator, Dropdown, Column,
    // ]
    // , providers: [PlacesService]
})
export class BclPlacesComponent extends BaseComponent implements OnInit {

    public planets:Place[] = new Array<Place>();
    public affiliations:SelectItem[] = [];
    public selectedAffiliation:String = "Gulu Farxad Adag";
    public selectedPlace:Place;
    public loading:boolean = true;

    constructor(private placesService:PlacesService) {
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
        });        
    }
    private loadAffiliations() {
        this.affiliations.push({label: '--Select an Affiliation--', value: null});
        this.affiliations.push({label: 'Alliance', value: "Alliance"});
        this.affiliations.push({label: 'Expansion', value: "Expansion"});
        this.affiliations.push({label: 'Federation', value: "Federation"});
        this.affiliations.push({label: 'Gulu Farxad Adag', value: "Gulu Farxad Adag"});
        this.affiliations.push({label: 'Independent', value: "Independent"});
        this.affiliations.push({label: 'Nihon-Koku', value: "Nihon-Koku"});
    }

    private selectPlace(place:Place) {
        this.loading = false;
        this.selectedPlace = place;
    }
}