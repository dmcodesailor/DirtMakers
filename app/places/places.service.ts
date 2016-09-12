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

    constructor(private http:Http) { }

    public getPlaceTypes():Observable<PlaceType[]> {
        var fileName = this.resourcePath + "place-types.json";
        return this.http.get(fileName)
        .map(this.extractData)
        .catch(this.handleError);
    }

    /**
    * 
    */
    // public get():Observable<any> {
    //     var fileName = this.resourcePath + "habhyg.json";
	// 	return this.http.get(fileName)
    //         .map(this.extractData)
	// 		//.map((response: Response) => <any> response.json())
    //         .catch(this.handleError);
    // }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    protected handleError(error: Response) {
        console.error('An error occurred', error);
        return Observable.throw(error.json().error);
    }

}