import { Component, OnInit } from '@angular/core';
import { app_config } from 'src/config';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  requestList;
  url = app_config.api_url + '/';
  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests() {
    this.requestService.getAll().subscribe((data: any) => {
      this.requestList = data.slice(0, 6);
      console.log(data);
    });
  }
}
