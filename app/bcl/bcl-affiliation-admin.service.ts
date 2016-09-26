import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';
import {Http, Response}             from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Affiliation }              from '../shared/models/affiliation';
import { ConfigService }            from '../shared/services/config.service';

@Injectable()
export class BclAffiliationAdminService {

    constructor(private config:ConfigService
                , private http:Http) {
     }

     private url():string {
         return this.config.baseApiUrl() + "Affiliations/";
     }

    public create(affiliation:Affiliation):Observable<number> {
        return this.http.post(this.url(), affiliation)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    public update(affiliation:Affiliation):Observable<boolean> {
        return this.http.put(this.url() + affiliation.id.toString(), affiliation)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    public delete(id:number):Observable<boolean> {
        return this.http.delete(this.url() + id.toString())
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