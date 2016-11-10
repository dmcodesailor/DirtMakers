import { EventEmitter }     from '@angular/core';
import { Subject }          from 'rxjs/Subject';
export class SocketOpenEventEmitter {
    private socketOpenEventSubj = new Subject<any>();
    public socketOpenEvent = this.socketOpenEventSubj.asObservable();
    constructor () {
    }
    public raise(value:any) {
        console.log(value);
        this.socketOpenEventSubj.next(value);
    }
}