import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { app_config } from 'src/config';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  url = app_config.api_url + '/';
  currentUser: any;
  updateForm;
  formReady = false;
  avatarImage: any;
  erroMsg: string;
  imgURL: string | ArrayBuffer;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: NbToastrService
  ) {}

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



  uploadAvatar(event: any) {
    let files = event.target.files;
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      Swal.fire('Images Only');
      return;
    }
    this.preview(event.target.files);
    let formData = new FormData();
    this.avatarImage = files[0].name;
    formData.append('image', files[0], files[0].name);
    this.userService.uploadAvatar(formData).subscribe((response) => {
      console.log(response);
    });
  }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.erroMsg = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  updateProfile() {
    let formdata = this.updateForm.value;
    this.userService
      .update(this.currentUser._id, formdata)
      .subscribe((data) => {
        this.userService.refreshUser();
        this.currentUser = this.userService.currentUser;
        this.toastr.success('Profile Updated', 'Success!');
      });
  }
}
