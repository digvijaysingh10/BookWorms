import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
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
    this.signupform = this.fb.group(
      {
        fullname: ['', Validators.required],
        avatar: '',
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirm: ['', Validators.required],
        age: 0,
        created: new Date(),
        isadmin: false,
        contacts: Array,
      },
      { validator: this.matchPassword('password', 'confirm') }
    );
  }

  matchPassword(password, repassword) {
    return (registerForm) => {
      let control1 = registerForm.controls[password];
      let control2 = registerForm.controls[repassword];

      if (control1.value !== control2.value) {
        control2.setErrors({ match: true });
      } else {
        control2.setErrors(null);
      }
    };
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
    if (!this.signupform.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Ooops!',
        text: 'Please enter valid details',
      });
      return;
    }
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

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
   }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  toggleSignUp() {
    document.getElementById('container').classList.add('right-panel-active');
  }

  toggleSignIn() {
    document.getElementById('container').classList.remove('right-panel-active');
  }

  // MustMatch(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //       const control = formGroup.controls[controlName];
  //       const matchingControl = formGroup.controls[matchingControlName];

  //       // return null if controls haven't initialised yet
  //       if (!control || !matchingControl) {
  //         return null;
  //       }

  //       // return null if another validator has already found an error on the matchingControl
  //       if (matchingControl.errors && !matchingControl.errors.mustMatch) {
  //           return null;
  //       }

  //       // set error on matchingControl if validation fails
  //       if (control.value !== matchingControl.value) {
  //           matchingControl.setErrors({ mustMatch: true });
  //       } else {
  //           matchingControl.setErrors(null);
  //       }
  //   }
  // }
}
