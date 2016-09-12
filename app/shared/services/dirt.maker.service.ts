import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DirtMakerStarData } from '../models/dirt.maker.star.data';
import { Coordinates } from '../models/coordinates';

@Injectable()
export class DirtMakerService {
    constructor(private http:Http) { }

    public getStarData():Observable<DirtMakerStarData> {
        var fileName = "http://localhost:3000/app/resources/dirtmakerdata.json";
        return this.http.get(fileName)
        .map((response: Response) => <DirtMakerStarData[]> response.json())
        .catch(this.handleError);
    }

    protected handleError(error: Response) {
        console.error('An error occurred', error);
        return Observable.throw(error.json().error);
    }
}