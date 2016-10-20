import { Injectable }                   from '@angular/core';
import { Observable }                   from 'rxjs/Observable';
import { Http, Response }               from "@angular/http";
import                                  'rxjs/add/operator/map';
import                                  'rxjs/add/operator/catch';
import { Place, Planet, City, Station } from '../shared/models/place';
import { ConfigService }                from '../shared/services/config.service';
import { AuthService }                  from '../shared/services/auth.service';
import { BaseService }                  from '../shared/services/base.service';

@Injectable()
export class BclPlaceAdminService extends BaseService {

    constructor(private config:ConfigService
                , private http:Http
                , private authService:AuthService) {
                    super(authService);
    }

    public handleLogout (message:string) {
        console.log("BclPlaceAdminService::handleLogout(" + message + ")");
    }

     private url():string {
         return this.config.baseApiUrl() + "Places/";
     }

    public create(affiliation:Place):Observable<number> {
        return this.http.post(this.url(), affiliation)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    public update(affiliation:Place):Observable<any> {
        return this.http.put(this.url() + affiliation.id.toString(), affiliation)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    public delete(id:number):Observable<boolean> {
        return this.http.delete(this.url() + id.toString())
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    private extractData(res: Response):any {
        let result:any = "";
        if (res.status === 200) {
            let body = res.json();
            result = body || { };
        }
        if (res.status === 204) {
            result = true;
        }
        return result;
    }

    protected handleError(error: Response) {
        console.error('An error occurred', error);
        return Observable.throw(error.json().error);
    }

}