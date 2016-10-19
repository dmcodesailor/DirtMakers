import { EventEmitter }     from '@angular/core';
import { Subject }          from 'rxjs/Subject';
export class LogoutEventEmitter {
    private logoutEventSubj = new Subject<string>();
    public logoutEvent = this.logoutEventSubj.asObservable();
    constructor () {
    }
    public raise(value:string) {
        console.log(value);
        this.logoutEventSubj.next(value);
        // super.next(value);
        // this.next(value);
        // super.next(value);
    }
}