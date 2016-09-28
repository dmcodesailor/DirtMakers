import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { HostBinding, trigger, transition
        , animate, style, state }           from '@angular/core';

import { SharedModule }                     from 'primeng/primeng';
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
    selector: 'dm-bcl-place-details-admin',
    templateUrl: 'app/bcl/bcl-place-details.component.html'
    , animations: [
        trigger('routeAnimation', [
            state('*',
                style({
                    opacity: 1,
                    transform: 'translateX(0)'
                })
            ),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.2s ease-in')
            ]),
            transition('* => void', [
                animate('0.5s ease-out', 
                    style({
                        opacity: 0,
                        transform: 'translateY(100%)'
                    }))
            ])
        ])
    ]
})
export class BclPlaceDetailsComponent extends BaseComponent implements OnInit {
    
    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }

    @HostBinding('style.display') get display() {
        return 'block';
    }

    @HostBinding('style.position') get position() {
        return 'relative';
    }

    public places:Place[] = [];
    public loading:boolean = true;
    public selectedPlace:Place;
    private placeTypeName:string;
    private selectedPlaceId: number;
    private planets:Planet[] = [];
    private planetsSelectItems:SelectItem[] = [];
    private selectedPlanet:Planet;
    public actionMode:string = "New";

    constructor(private route:ActivatedRoute
                , private router:Router
                , private adminService:BclPlaceAdminService
                , private readService:PlacesService) {
        super();
    }

    ngOnInit() {
        this.loading = true;
        this.extractPlaceType();
        this.extractPlaceId();
        this.loadPlanets();
        if (this.selectedPlaceId > 0) {
            this.loadPlace(this.selectedPlaceId);
        } else {
            this.loading = false;
        }
     }

     private loadPlanets() {
         this.readService.getPlanets().toPromise().then((planets:Planet[]) => {
             this.planets = planets;
             planets.forEach((planet:Planet) => {
                 if (planet.Name.trim().length > 0) {
                    this.planetsSelectItems.push({label: planet.Name, value: planet.id});
                 }
             })
         });
     }

     private extractPlaceType() {
        //  this.route.params.toPromise().then((params:Params) => {
        //      this.placeTypeName = params['cat'];
        //  })
         this.route.params.forEach((params:Params) => {
            this.placeTypeName = params['cat'];
         });
         if (this.placeTypeName && this.placeTypeName.length > 0) {
             this.placeTypeName = this.placeTypeName.substr(0, 1).toUpperCase() + this.placeTypeName.substr(1);
        }
     }

     private extractPlaceId() {
         this.route.params.forEach((params:Params) => {
            this.selectedPlaceId = +params['id'];
            if (this.selectedPlaceId === 0) {
                this.actionMode = "New";
            } else {
                this.actionMode = "Edit";
            }
         });
     }

    private loadPlace(id:number) {
        this.places = new Array<Place>();
        this.readService.getOne(id).toPromise().then((place: Place) => {
            this.selectedPlace = place;
            this.loading = false;
        });
    }

    private cancel() {
        this.router.navigate(['bcl/places', {cat: this.placeTypeName}])
    }

}