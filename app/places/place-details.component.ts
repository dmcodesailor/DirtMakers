import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BaseComponent } from '../shared/components/base.component';
import { PlacesModule } from './places.module';
import { Place } from '../shared/models/place';
import { PlaceType } from '../shared/models/place-type';
import { PlacesService } from '../shared/services/places.service';

@Component({
    selector: 'dm-place',
    templateUrl: 'app/places/place-details.component.html'
})
export class PlaceDetailsComponent extends BaseComponent {

    public place:Place = new Place();
    private sub: Subscription;

    constructor(private route: ActivatedRoute
                , private router: Router
                , private service: PlacesService) { 
        super();
    }

    ngOnInit() { 
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            let typeName:string = params['tn'];

            let places:Observable<Place[]> = null;
            switch (typeName.toLowerCase()) {
                case "planet":
                    places = this.service.getPlanets();
                break;
                case "city":
                    places = this.service.getCities();
                break;
                case "station":
                    places = this.service.getStations();
                break;
                default:
                    // Do NO OP
                break;
            }

            if (places != null && places != undefined) {
                places.subscribe((data:Place[]) => {
                    let selectedPlace:Place = data.find((v:Place, i:number) => v.id == id);
                    this.place = selectedPlace;
                });
            }
        });
    }

    ngOnDestroy () {
        this.sub.unsubscribe();
    }

}