import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signupform: any;
  avatarImage: any;
  erroMsg: string;
  imgURL: string | ArrayBuffer;
  signinform: any;
  socialUser: SocialUser;
  isLoggedin: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.initSignupForm();
    // document
    //   .getElementsByTagName('nb-layout-column')[0]
    //   .classList.add('register');

      this.initSigninForm();

      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
        console.log(this.socialUser);
      });
  }

  ngOnDestroy() {
    document
      .getElementsByTagName('nb-layout-column')[0]
      .classList.remove('register');
  }

  initSignupForm() {
    this.signupform = this.fb.group({
      fullname: '',
      avatar: '',
      email: '',
      password: '',
      confirm: '',
      age: 0,
      created: new Date(),
      isadmin: false,
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

  submitSignupForm() {
    let formdata = this.signupform.value;
    formdata.avatar = this.avatarImage;
    this.userService.addUser(formdata).subscribe((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Great!',
        text: 'Successfully Registered, Now Login to Continue.',
      }).then(() => {
        this.router.navigate(['/app/signin']);
      });
    });
  }


  initSigninForm() {
    this.signinform = this.fb.group({
      email: '',
      password: '',
    });
  }

  submitSigninForm() {
    let formdata = this.signinform.value;

    this.userService.getUserByEmail(formdata.email).subscribe((userdata) => {
      if (userdata) {
        if (userdata['password'] == formdata['password']) {
          Swal.fire({
            icon: 'success',
            title: 'Great!',
            text: 'Successfully Loggedin',
          }).then(() => {
            this.userService.loggedin = true;
            sessionStorage.setItem('user', JSON.stringify(userdata));
            this.userService.currentUser = userdata;

            if (userdata['isadmin']) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user']);
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: "Email and Password does't match",
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: "Email and Password does't match",
        });
      }
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }





  toggleSignUp(){
    document.getElementById('container').classList.add("right-panel-active");
  }

  toggleSignIn(){
    document.getElementById('container').classList.remove("right-panel-active");
  }

}
