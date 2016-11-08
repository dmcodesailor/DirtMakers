import { Component, OnInit } from '@angular/core';
// import * as io from "socket.io-client";
import { SocketService }         from '../services/socket.service';

@Component({
    selector: 'dm-sock',
    templateUrl: 'app/shared/components/socket.component.html'
})
export class SocketComponent implements OnInit {
    // socket:SocketIOClient.Socket = null;
    public message:string;
    public messages:string[] = [];

    constructor(private sockectService:SocketService) { 
        // this.socket = io.connect("http://localhost:9999");
    }

    ngOnInit() {
        this.sockectService.openEvent.subscribe((value:any) => {
            console.log("Connected to socket server.");
        });
        this.sockectService.messageEvent.subscribe((value:any) => {
            console.log("socket component " + value.data);
            this.message = value.data;
            this.messages.push(value.data);
        });
        this.sockectService.closeEvent.subscribe((value:any) => {
            console.log("Disconnected from socket server.");
        });
        // this.socket.on("news", v => {
        //     this.message = v.hello;
        //     this.messages.push(v.hello);
        //     console.log(v);
        // });
        // this.socket.on("connect", v => {
        //     this.messages.push("connected");
        // });
    }

    public send(message:string) {
        console.log("sending " + message);
        this.sockectService.send("message");
    }
}