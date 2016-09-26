import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';
import {Http, Response}             from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Affiliation }              from '../models/affiliation';
import { ConfigService }            from './config.service';

@Injectable()
export class AffiliationService {

    constructor(private config:ConfigService
                , private http:Http) {
    }

    private url():string {
        return this.config.baseApiUrl() + "Affiliations/";
    }

    public get():Observable<Affiliation[]> {
        return this.http.get(this.url())
                    .map(this.extractData)
                    .catch(this.handleError);     
    }

    public getOne(id:number):Observable<Affiliation> {
    return this.http.get(this.url() + id.toString())
                .map(this.extractData)
                .catch(this.handleError);
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