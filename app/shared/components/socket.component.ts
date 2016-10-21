import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";

@Component({
    selector: 'dm-sock',
    templateUrl: 'app/shared/components/socket.component.html'
})
export class SocketComponent implements OnInit {
    socket:SocketIOClient.Socket = null;
    public message:string;
    public messages:string[] = [];

    constructor() { 
        this.socket = io.connect("http://localhost:1337");
    }

    ngOnInit() { 
        this.socket.on("news", v => {
            this.message = v.hello;
            this.messages.push(v.hello);
            console.log(v);
        });
        this.socket.on("connect", v => {
            this.messages.push("connected");
        });
    }
}