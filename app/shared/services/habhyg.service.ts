import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { StarData } from '../models/star.data';
import { Distances } from '../models/distances';
import { DirtMakerStarData } from '../models/dirt.maker.star.data';

@Injectable()
export class HabHygService {

    private habhygData:Observable<StarData[]> = null;
    private fileName:string = "/app/resources/habhyg.json";

    constructor(private http:Http) { }

    public get():Observable<StarData[]> {
        if (this.habhygData == null) {
            this.habhygData = this.http.get(this.fileName)
                                        .map(this.extractData)
                                        .catch(this.handleError);            
        }
        return this.habhygData;
    }

    public getItem(id:number):Observable<StarData[]> {
        return this.http.get(this.fileName).map(this.extractData);
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