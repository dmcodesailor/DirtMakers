import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { StarData } from '../models/star.data';
import { Coordinates } from '../models/coordinates';
import { Distances } from '../models/distances';
import { DirtMakerStarData } from '../models/dirt.maker.star.data';

@Injectable()
export class HabHygService {

    private habhygData:Observable<StarData[]> = null;

    constructor(private http:Http) { }

    /**
     * 
     */
    public get():Observable<StarData[]> {
        if (this.habhygData == null) {
            var fileName = "/app/resources/habhyg.json";
            // let promise:Promise<StarData[]> = Promise.resolve(this.http.get(fileName).map(this.extractData).toPromise());
            // promise.then(starData => this.habhygData = starData); 
            // this.http.get(fileName).map(this.extractData).catch(this.handleError);
            this.habhygData = this.http.get(fileName)
                                        .map(this.extractData)
                                        .catch(this.handleError);            
        }
        return this.habhygData;
    }

    public getItem(id:number):Observable<StarData[]> {
            // var fileName = "/app/resources/habhyg.json";
            // return this.http.get(fileName)
            //                 .map((res:Response) => res)
            //                 .filter((v, i) => v[i].id == id)
            //                 .catch(this.handleError);
            // return Observable.from(this.habhygData.first(sda =>  .filter.single(hhd => hhd == id));  
            //return ;//.map((sd:StarData) => sd);
            var fileName = "/app/resources/habhyg.json";
            // let promise:Promise<StarData[]> = Promise.resolve(this.http.get(fileName).map(this.extractData).toPromise());
            // promise.then(starData => this.habhygData = starData); 
            // this.http.get(fileName).map(this.extractData).catch(this.handleError);
            let resultArray:StarData[] = new Array<StarData>();
            return this.http.get(fileName)
                                        .map(this.extractData)
                                        // .single((v:StarData, i:number, s:Observable<StarData[]>) => v[i].id == id);
                                        // .first((v:StarData, i:number) => v[i].id == id);
                                        // .catch(this.handleError);            
            // let result:Observable<StarData> = this.habhygData.filter((v, i) => v[i].id === id)[0];
            // let stda:StarData = null;
            // result.toPromise().then(sd => stda = sd);
            // console.log(stda.id);
            // let result:StarData = null;
            // if (resultArray != null) {
            //     resultArray = resultArray.filter((v:StarData, i:number) => v[i].id == id);
            //     console.log(resultArray.length);
            // }
            // return result;
    }

    private extractData(res: Response) {
        let body = res.json();
       // console.log(body);
        // for (let item in body.split(",")) {
        //     console.log (item);
        // }
        return body || { };
    }

    protected handleError(error: Response) {
        console.error('An error occurred', error);
        return Observable.throw(error.json().error);
    }

}