import { Inject, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { app_config } from 'src/config';
import { RequestService } from '../services/request.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.css'],
})
export class RequestDialogComponent implements OnInit {
  url = app_config.api_url + '/';
  requestList;
  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private router: Router,
    public dialogRef: MatDialogRef<RequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public requestData
  ) {}

  ngOnInit(): void {
    console.log(this.requestData);
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
