import { Injectable }                   from '@angular/core';
// sudo typings install dt~sockjs-client --global
// sudo typings info dt~sockjs-client --versions
import SockJS                           from 'sockjs-client';
import BaseEvent                        = __SockJSClient.BaseEvent;
import SockJSClass                      = __SockJSClient.SockJSClass;
import { Subject }                      from 'rxjs/Subject';
import { SocketOpenEventEmitter }       from '../events/socket-open.event';
import { SocketMessageEventEmitter }    from '../events/socket-message.event';
import { SocketCloseEventEmitter }      from '../events/socket-close.event';

@Injectable() 
export class SocketService {
// Fields
    private sock:SockJSClass;
    private autoConnect:boolean = true;
    private retryInterval;

// Properties
    public connected:boolean = false;
    public openEvent:SocketOpenEventEmitter = new SocketOpenEventEmitter();
    public messageEvent:SocketMessageEventEmitter = new SocketMessageEventEmitter();
    public closeEvent:SocketCloseEventEmitter = new SocketCloseEventEmitter();

/**
 * Creates an instance of SocketService.
 * SockJS Ready States:
 * 0 - Connecting
 * 1 - Connected
 * 2 - Closing
 * 3 - Closed
 * @memberOf SocketService
 */
    constructor() {
        this.connect();
    }

    public connect () {
        if (this.connected === false) {
            try {
                console.log("Connecting...");
                this.sock = SockJS("http://localhost:9999/echo", null, {});
                this.sock.onopen = (oe) => {this.onOpen(oe);};
                this.sock.onclose = (ce) => {this.onClose(ce);};
            } catch (ex) {
                console.log("connect-exception: " + ex);
                clearInterval(this.retryInterval);
            }
        }
    }

    public send(message:any) {
        this.sock.send(message);
    }

    private onOpen(oe:__SockJSClient.OpenEvent) {        
        if (this.sock.readyState === 1) { // 1 - Connected
            // Wire the event handler for the onmessage event.
            this.sock.onmessage = (me) => {this.onMessage(me);};
            // Set the internal state to show connectivity.
            this.connected = true;
            // Stop retrying/trying to connect.  Even though
            clearInterval(this.retryInterval);
            // Fire the event for consumers.
            this.openEvent.raise(oe);
        }
    }  

    private onMessage(me:__SockJSClient.MessageEvent) {
        let messageObject = JSON.parse(me.data.toString());
        this.messageEvent.raise(me);
    }

    private onClose(ce:__SockJSClient.CloseEvent) {
        this.closeEvent.raise(ce);
        this.sock = null;
        this.connected = false;
        // Poll for the connection if the flag is set.
        if (this.autoConnect === true) {
            this.closeEvent.raise(ce);
            this.retryInterval = setInterval(() => this.connect() , 5000 );
        }
    }
}