import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { app_config } from 'src/config';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  url = app_config.api_url + '/';
  currentUser: any;
  updateForm;
  formReady = false;
  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.initUpdateForm(this.currentUser);
  }

  initUpdateForm(data) {
    this.updateForm = this.fb.group(data);
    this.formReady = true;
  }

  updatePassword(newPwd, conPwd) {
    if (newPwd != conPwd) {
      Swal.fire({
        icon: 'error',
        title: 'Really?',
        text: "Passwords doesn't match.",
      });
      return;
    }

    this.userService
      .update(this.currentUser._id, { password: newPwd })
      .subscribe((res) => {
        this.userService.refreshUser();
        this.currentUser = this.userService.currentUser;
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Password updated.',
        });
      });
  }

  updateProfile() {
    let formdata = this.updateForm.value;
    this.userService
      .update(this.currentUser._id, formdata)
      .subscribe((data) => {
        this.userService.refreshUser();
        this.currentUser = this.userService.currentUser;
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Profile updated.',
        });
      });
  }
}
