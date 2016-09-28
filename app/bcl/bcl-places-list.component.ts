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
import { DmSharedModule }                   from '../shared/dm-shared.module';
import { BclPlaceAdminService }             from './bcl-places-admin.service';
import { PlacesService }                    from '../shared/services/places.service';
import { Place, Planet, City, Station }     from '../shared/models/place';
import { DialogComponent }                  from '../shared/components/dialog.component';

@Component({
    selector: 'dm-bcl-places-list-admin',
    templateUrl: 'app/bcl/bcl-places-list.component.html'
})
export class BclPlacesListComponent extends BaseComponent implements OnInit {

    public places:Place[] = [];
    public loading:boolean = true;
    public selectedPlace:Place;
    private placeTypeName:string;

    constructor(private route:ActivatedRoute
                , private router:Router
                , private adminService:BclPlaceAdminService
                , private readService:PlacesService) {
        super();
    }

    ngOnInit() {
        this.loading = true;
        this.extractPlaceType();
        this.loadPlaces();
     }

     private extractPlaceType() {
         this.route.params.forEach((params:Params) => {
            this.placeTypeName = params['cat'];
         });
         if (this.placeTypeName && this.placeTypeName.length > 0) {
            this.placeTypeName = this.placeTypeName.substr(0, 1).toUpperCase() + this.placeTypeName.substr(1);
         }
         //  this.placeTypeName = this.route.queryParams['cat'];
     }

    private loadPlaces() {
        this.places = new Array<Place>();
        this.readService.get().toPromise().then((places: Place[]) => {
            for (let i:number = 0; i < places.length; i++) {
                let place:Place = places[i];
                this.places.push(place);
            }
            this.loading = false;
        });
    }

    private new() {
        this.router.navigate(['bcl/place/0', {cat: this.placeTypeName.toLowerCase()}]);
    }

    private edit(place:Place) {
        this.router.navigate(['bcl/place/' + place.id.toString(), {cat: this.placeTypeName.toLowerCase()}]);        
    }

    private delete(place:Place) {
        if (place !== null && place.id > 0) {
            this.dialog.showDialog("Are you sure you want to delete the selected place?");
            this.adminService.delete(this.selectedPlace.id).toPromise().then((result:boolean) => {
                if (result) {
                    alert ("Successfully deleted place.");
                    this.loadPlaces();
                } else {
                    alert ("Place not deleted.");
                }
            })
        }
    }


}