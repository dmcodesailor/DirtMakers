import { EventEmitter }     from '@angular/core';
import { Subject }          from 'rxjs/Subject';
export class SocketCloseEventEmitter {
    private socketCloseEventSubj = new Subject<any>();
    public socketCloseEvent = this.socketCloseEventSubj.asObservable();
    constructor () {
    }
    public raise(value:__SockJSClient.OpenEvent) {
        console.log(value);
        this.socketCloseEventSubj.next(value);
    }
}