import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { app_config } from 'src/config';
import { RequestService } from '../services/request.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css'],
})
export class ListRequestComponent implements OnInit {
  requestList;
  url = app_config.api_url + '/';
  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests() {
    this.requestService.getAll().subscribe((data) => {
      this.requestList = data;
      console.log(data);
    });
  }

  repondToUser(user_id) {
    this.userService
      .addContact(this.userService.currentUser._id, user_id)
      .subscribe((res) => {
        console.log(res);
        this.userService.refreshUser();
        this.router.navigate(['/user/chat']);
      });
  }
}
