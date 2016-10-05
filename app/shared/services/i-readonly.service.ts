import { Observable }                   from 'rxjs/Observable';
export interface IReadOnlyService {
    get():Observable<any[]>;
}