import { Component, OnInit }                from '@angular/core';
import { Router
        , ActivatedRoute
        , Params 
        }                                   from '@angular/router';
import { HostBinding
        , trigger
        , transition
        , animate
        , style
        , state 
        }                                   from '@angular/core';
import { FormBuilder
        , Validators
        , FormGroup
        , FormControl 
        }                                   from '@angular/forms';

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
import { AffiliationService }               from '../shared/services/affiliation.service';
import { Affiliation }                      from '../shared/models/affiliation';
import { IReadOnlyService }                 from '../shared/services/i-readonly.service';

@Component({
    selector: 'dm-bcl-place-details-admin',
    templateUrl: 'app/bcl/bcl-place-details.component.html'
    // , animations: [
    //     trigger('routeAnimation', [
    //         state('*',
    //             style({
    //                 opacity: 1,
    //                 transform: 'translateX(0)'
    //             })
    //         ),
    //         transition('void => *', [
    //             style({
    //                 opacity: 0,
    //                 transform: 'translateX(-100%)'
    //             }),
    //             animate('0.2s ease-in')
    //         ]),
    //         transition('* => void', [
    //             animate('0.5s ease-out', 
    //                 style({
    //                     opacity: 0,
    //                     transform: 'translateY(100%)'
    //                 }))
    //         ])
    //     ])
    // ]
})
export class BclPlaceDetailsComponent extends BaseComponent implements OnInit {
    
    // @HostBinding('@routeAnimation') get routeAnimation() {
    //     return true;
    // }

    // @HostBinding('style.display') get display() {
    //     return 'block';
    // }

    // @HostBinding('style.position') get position() {
    //     return 'relative';
    // }

    public places:Place[] = [];
    public loading:boolean = true;
    public selectedPlace:Place;
    private placeTypeName:string;
    private selectedPlaceId: number;
    private planets:Planet[] = [];
    private planetsSelectItems:SelectItem[] = [];
    private selectedPlanet:Planet;
    public actionMode:string = "New";
    public affiliations:SelectItem[] = [];
    public selectedAffiliation:SelectItem;

    public userform: FormGroup;

    constructor(private route:ActivatedRoute
                , private router:Router
                , private fb: FormBuilder
                , private adminService:BclPlaceAdminService
                , private readService:PlacesService
                , private affiliationService:AffiliationService) {
        super();
    }

    ngOnInit() {
        this.loading = true;
        this.initValidation();
        this.extractPlaceType();
        this.extractPlaceId();
        this.loadPlanets();
        this.loadAffiliations();
        if (this.selectedPlaceId > 0) {
            this.loadPlace(this.selectedPlaceId);
        } else {
            this.loading = false;
        }
     }

     initValidation () {
         
          this.userform = this.fb.group({
            // 'name': new FormControl('', Validators.required)
            // 'firstname': new FormControl('', Validators.required),
            // 'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            // 'description': new FormControl(''),
            // 'gender': new FormControl('', Validators.required)
        });
     }

     /**
      * 
      * 
      * @private
      * 
      * @memberOf BclPlaceDetailsComponent
      */
    private loadAffiliations() {
        this.affiliations = [];
        this.affiliations.push({label:'-- select an affiliation --', value:-1})
        this.affiliationService.get().toPromise().then((affiliations:Affiliation[]) => {
            affiliations.forEach((affiliation:Affiliation) => { 
                this.affiliations.push({label: affiliation.Name, value: affiliation.id});
            });
        });
    }

     /**
      * 
      * 
      * @private
      * 
      * @memberOf BclPlaceDetailsComponent
      */
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

     /**
      * 
      * 
      * @private
      * 
      * @memberOf BclPlaceDetailsComponent
      */
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

    /**
     * 
     * 
     * @private
     * 
     * @memberOf BclPlaceDetailsComponent
     */
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

     /**
      * 
      * 
      * @private
      * @param {number} id
      * 
      * @memberOf BclPlaceDetailsComponent
      */
    private loadPlace(id:number) {
        this.places = new Array<Place>();
        this.readService.getOne(id).toPromise().then((place: Place) => {
            this.selectedPlace = place;
            this.loading = false;
        });
    }

    /**
     * 
     * 
     * @private
     * 
     * @memberOf BclPlaceDetailsComponent
     */
    private newPlace() {
        this.selectedPlace = new Place();
        this.selectedPlace.id = -1;
        this.selectedPlace.Type = this.placeTypeName;
    }

    /**
     * 
     * 
     * @private
     * 
     * @memberOf BclPlaceDetailsComponent
     */
    private cancel() {
        this.router.navigate(['bcl/places', {cat: this.placeTypeName}])
    }

    /**
     * 
     * 
     * @private
     * 
     * @memberOf BclPlaceDetailsComponent
     */
    private save(form:FormGroup) {
        // this.userform.controls['name'].markAsDirty();
        // this.userform.controls['name'].updateValueAndValidity();
        // this.userform.markAsDirty();
        // this.userform.updateValueAndValidity();
        // Validators.apply(this.userform, null);
        // console.log(this.selectedAffiliation.value);
        // if (this.selectedPlace.id > 0) {
        //     this.update(this.selectedPlace);
        // } else {
        //     this.create(this.selectedPlace);
        // }
    }

    /**
     * 
     * 
     * @private
     * @param {Place} place
     * 
     * @memberOf BclPlaceDetailsComponent
     */
    private create(place:Place) {
        if (place !== null && place.id < 1) {
            //place.Affiliation = this.getActualAffiliation(this.selectedAffiliation);
            let ddt:DropDownTranslator<Affiliation> = new DropDownTranslator<Affiliation>(this.affiliationService);
            let affiliation:Affiliation = ddt.objectFromSelectItem(this.selectedAffiliation);
        } else {
            
        }
    }

    /**
     * 
     * 
     * @private
     * @param {Place} place
     * 
     * @memberOf BclPlaceDetailsComponent
     */
    private update(place:Place) {

    }

    /**
     * A convenience method for transformating a SelectItem from the affiliations
     * picklist to an actual Affiliation object;
     * 
     * @private
     * @param {SelectItem} selectedAffiliation
     * @returns {Affiliation}
     * 
     * @memberOf BclPlaceDetailsComponent
     */
    private affiliationFromSelectItem(selectedAffiliation:SelectItem):Affiliation {
        let actualAffiliation:Affiliation = null;
        if (selectedAffiliation !== null) {
            this.affiliationService.get().toPromise().then((affiliations:Affiliation[]) => {
                affiliations.forEach((affiliation:Affiliation) => {
                    if (affiliation.id === selectedAffiliation.value) {
                        actualAffiliation = affiliation; 
                    }
                });
            });
        }
        return actualAffiliation;
    }
}

export class DropDownTranslator<T> {
    constructor(private service:IReadOnlyService) {
    }
        
    public objectFromSelectItem(item:SelectItem):T {
        let actualObject:T = null;
        if (item !== null) {
            this.service.get().toPromise().then((objects:T[]) => {
                objects.forEach((obj:T) => {
                    if (obj.hasOwnProperty("id")) {
                        let id:number = +obj["id"];
                        if (id === item.value) {
                            actualObject = (obj as T); 
                        }
                    } 
                });
            });
        }
        return actualObject;        
    }
}