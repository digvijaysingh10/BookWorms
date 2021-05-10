import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
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
    this.socket.connect();
  }
}
