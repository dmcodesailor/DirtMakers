import { Component, OnInit } from '@angular/core';
import { Subject }           from 'rxjs/Subject';
import { SocketService }     from '../services/socket.service';

@Component({
    selector: 'dm-sock',
    templateUrl: 'app/shared/components/socket.component.html'
})
export class SocketComponent implements OnInit {
    // socket:SocketIOClient.Socket = null;
    public message:string;
    public messages:string[] = [];


    constructor(private socketService:SocketService) { 
        // this.socket = io.connect("http://localhost:9999");
    }

    ngOnInit() {
        this.socketService.openEvent.socketOpenEvent.subscribe((value:any) => {
            console.log("Connected to socket server.");
        });
        this.socketService.messageEvent.socketMessageEvent.subscribe((value:any) => {
            // console.log("socket component " + value.data);
            this.message = value.data;
            this.messages.push(value.data);
        });
        this.socketService.closeEvent.socketCloseEvent.subscribe((value:any) => {
            console.log("Disconnected from socket server.");
        });
    }

    public send(message:string) {
        console.log("sending " + message);
        this.socketService.send("message");
    }

}