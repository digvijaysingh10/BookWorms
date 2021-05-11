import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { app_config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  socket;
  url = app_config.api_url;
  constructor() {}

  connectServer() {
    this.socket = io(this.url);
    console.log(this.socket);
  }

  send(data) {
    this.socket.emit('sendmsg', data);
  }

  receive() {
    return new Observable((observer) => {
      this.socket.on('recmsg', (data) => {
        observer.next(data);
      });
    });
  }
}
