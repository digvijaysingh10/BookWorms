import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { app_config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = app_config.api_url + '/user';
  loggedin = false;
  currentUser: any;

  constructor(private http: HttpClient, private router: Router) {
    let user = sessionStorage.getItem('user');
    if (user) {
      this.loggedin = true;
      this.currentUser = JSON.parse(user);
    }
  }

  addUser(data: any) {
    return this.http.post(this.url + '/add', data);
  }

  getUserByEmail(email: String) {
    return this.http.get(this.url + '/getbyemail/' + email);
  }

  deleteUser(id) {
    return this.http.delete(this.url + '/delete/' + id);
  }

  getAll() {
    return this.http.get(this.url + '/getall');
  }

  update(id: String, data: Object) {
    return this.http.put(this.url + '/update/' + id, data);
  }

  uploadAvatar(file: any) {
    return this.http.post(app_config.api_url + '/util/addimg', file);
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/app/signin']);
    this.currentUser = null;
    this.loggedin = false;
  }

  refreshUser() {
    this.http
      .get(this.url + '/getbyid/' + this.currentUser._id)
      .subscribe((userdata) => {
        this.currentUser = userdata;
        sessionStorage.setItem('user', JSON.stringify(userdata));
      });
  }
}
