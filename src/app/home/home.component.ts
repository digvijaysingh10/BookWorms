import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { app_config } from 'src/config';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';
import { RequestService } from '../services/request.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  requestList;
  url = app_config.api_url + '/';
  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests() {
    this.requestService.getAll().subscribe((data: any) => {
      this.requestList = data.slice(0, 6);
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

  open(data) {
    const dialogRef = this.dialog.open(RequestDialogComponent, {
      width: '1250px',
      data: data,
    });
  }
}
