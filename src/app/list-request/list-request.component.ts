import { Component, OnInit } from '@angular/core';
import { app_config } from 'src/config';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent implements OnInit {

  requestList;
  url = app_config.api_url + '/';
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests() {
    this.requestService.getAll().subscribe((data) => {
      this.requestList = data;
    });
  }
}
