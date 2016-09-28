import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Place, Planet, City, Station } from '../models/place';
import { PlaceType }                    from '../models/place-type';
import { ConfigService }                from './config.service';

@Injectable()
export class PlacesService {

    private resourcePath: string = "/app/resources/";
    private fileNameTemplate:string = "places-{0}.json"

    constructor(private config:ConfigService
                , private http:Http) {

    }

          private url():string {
         return this.config.baseApiUrl() + "Places/";
     }


    public getPlaceTypes():Observable<PlaceType[]> {
        var fileName = this.resourcePath + "place-types.json";
        return this.http.get(fileName)
        .map(this.extractData)
        .catch(this.handleError);
    }

    public get():Observable<Place[]> {
        return this.http.get(this.url())
                    .map(this.extractData)
                    .catch(this.handleError);     
    }

    public getOne(id:number):Observable<Place> {
        return this.http.get(this.url() + id.toString())
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getPlanets():Observable<Planet[]> {
        return this.getEx("planets");
    }

    public getCities():Observable<City[]> {
        return this.getEx("cities");
    }

    public getStations():Observable<Station[]> {
        return this.getEx("stations");
    }

    private getEx(placeTypeNamePluralized:string):Observable<any[]> {
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