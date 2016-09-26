import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Place, Planet, City, Station } from './place';
import { PlaceType } from './place-type';

@Injectable()
export class PlacesService {

    private resourcePath: string = "/app/resources/";
    private fileNameTemplate:string = "places-{0}.json"

    constructor(private http:Http) {

     }

    public getPlaceTypes():Observable<PlaceType[]> {
        var fileName = this.resourcePath + "place-types.json";
        return this.http.get(fileName)
        .map(this.extractData)
        .catch(this.handleError);
    }

    public getPlanets():Observable<Planet[]> {
        return this.get("planets");
    }

    public getCities():Observable<City[]> {
        return this.get("cities");
    }

    public getStations():Observable<Station[]> {
        return this.get("stations");
    }

    private get(placeTypeNamePluralized:string):Observable<any[]> {
        placeTypeNamePluralized = placeTypeNamePluralized.toLocaleLowerCase();
        let placeTypeFileName = this.fileNameTemplate.replace("{0}", placeTypeNamePluralized);
        let fullFileName = this.resourcePath + placeTypeFileName;
        return this.http.get(fullFileName).map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    protected handleError(error: Response) {
        console.error('An error occurred', error);
        return Observable.throw(error.json().error);
    }

}