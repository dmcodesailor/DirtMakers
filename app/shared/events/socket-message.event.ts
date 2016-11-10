import { EventEmitter }     from '@angular/core';
import { Subject }          from 'rxjs/Subject';
export class SocketMessageEventEmitter {
    private socketMessageEventSubj = new Subject<any>();
    public socketMessageEvent = this.socketMessageEventSubj.asObservable();
    constructor () {
    }
    public raise(value:any) {
        // console.log(value);
        this.socketMessageEventSubj.next(value);
    }
}