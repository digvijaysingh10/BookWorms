import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { app_config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url = app_config.api_url + '/request';
  constructor(private http: HttpClient, private router: Router) { }

  addrequest(data: any) {
    return this.http.post(this.url + '/add', data);
  }

  getAll() {
    return this.http.get(this.url + '/getall');
  }

  getNovelByUser(id){
    return this.http.get(this.url + '/getbyuser/' + id);
  }
}
