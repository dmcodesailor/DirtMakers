import { Injectable }               from '@angular/core';
// sudo typings install dt~sockjs-client --global
// sudo typings info dt~sockjs-client --versions
import SockJS                       from 'sockjs-client';
import BaseEvent                    = __SockJSClient.BaseEvent;
import SockJSClass                  = __SockJSClient.SockJSClass;
import { Subject }                  from 'rxjs/Subject';
import { SocketOpenEventEmitter }   from '../events/socket-open.event';
import { SocketMessageEventEmitter }from '../events/socket-message.event';
import { SocketCloseEventEmitter }  from '../events/socket-close.event';

@Injectable() 
export class SocketService {
    private sock:SockJSClass;
    private autoConnect:boolean = true;
    private retryInterval;
    private reconnecting:boolean = false;

    public connected:boolean = false;
    public openEvent:SocketOpenEventEmitter = new SocketOpenEventEmitter();
    public messageEvent:SocketMessageEventEmitter = new SocketMessageEventEmitter();
    public closeEvent:SocketCloseEventEmitter = new SocketCloseEventEmitter();

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
        if (this.sock.readyState === 1) {
            this.sock.onmessage = (me) => {this.onMessage(me);};
            this.connected = true;
            clearInterval(this.retryInterval);
            this.reconnecting = false;
            try {
                this.openEvent.raise(oe);
            } catch (ex) {
                console.log(ex);
            }
        }
    }  

    private onMessage(me:__SockJSClient.MessageEvent) {
        let messageObject = JSON.parse(me.data.toString());
        try {
            this.messageEvent.raise(me);
        } catch (ex) {
            console.log(ex);
        }
    }

    private onClose(ce:__SockJSClient.CloseEvent) {
        let v = "onClose (null)";
        if (this.sock !== null) {
            v = "onClose " + this.sock.readyState;
        }
        console.log(v);
        this.sock = null;
        this.connected = false;
        try {
            // if (this.sock.readyState === 3) {
                // console.log("onClose (3)");
                // Poll for the connection if the flag is set.
                if (this.autoConnect === true && this.reconnecting === false) {
                    this.closeEvent.raise(ce);
                    console.log("reconnecting...");
                    this.reconnecting = true;
                    this.retryInterval = setInterval(() => this.connect() , 5000 );
                }
            // }
        } catch(ex) {
            console.log("onClose-Exception: " + ex);
        }
    }
}