import { Component, OnInit } from '@angular/core';
import { app_config } from 'src/config';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messageList = [];
  url = app_config.api_url + '/';
  selContact;
  constructor(
    private chatService: ChatService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.chatService.connectServer();
    this.chatService.register(this.userService.currentUser._id);
    this.chatService.receive().subscribe((data: any) => {
      console.log(data);
      this.messageList.push(data);
      if (!this.alreadyInContact(data.user._id)) {
        this.userService
          .addContact(this.userService.currentUser._id, data.user._id)
          .subscribe((res) => {
            console.log('contact added');
          });
      }
    });

    this.selContact = this.userService.currentUser.contacts[0];
    // this.initMessages();
  }

  initMessages() {
    let message1 = {
      text: 'Hey',
      user: this.userService.currentUser,
      reply: true,
      created: new Date(),
    };

    let message2 = {
      text: 'Helo',
      user: this.userService.currentUser,
      reply: true,
      created: new Date(),
    };

    let message3 = {
      text: 'I want to buy your book',
      user: this.userService.currentUser,
      reply: true,
      created: new Date(),
    };

    this.messageList.push(message1);
    this.messageList.push(message2);
    this.messageList.push(message3);

    console.log(this.messageList);
  }

  sendMessage(e) {
    let message = {
      text: e.message,
      user: this.userService.currentUser,
      reply: true,
      created: new Date(),
      contact: this.selContact._id,
    };

    this.messageList.push(message);
    this.chatService.send(message);
  }

  alreadyInContact(id) {
    for (let contact of this.userService.currentUser.contacts) {
      if (contact._id == id) return true;
    }
    return false;
  }
}
