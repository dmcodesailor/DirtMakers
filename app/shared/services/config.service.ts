import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    constructor() {
    }
    public baseApiUrl():string {
        return "http://dmapi.loticfactor.com/api/";
    }
}