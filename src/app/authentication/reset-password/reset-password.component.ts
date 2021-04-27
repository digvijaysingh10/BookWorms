import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { app_config } from 'src/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  otp;
  showReset = false;
  resetform;
  url = app_config.api_url;
  forgotuser;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userservice: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.body.classList.add('bg-reg');
    this.initform();
  }
  ngOnDestroy() {
    document.body.classList.remove('bg-reg');
  }

  initform() {
    this.resetform = this.fb.group(
      {
        otp: [''],
        new: ['', Validators.minLength(5)],
        confirm: [''],
      },
      { validation: this.matchPassword('new', 'confirm') }
    );
  }

  matchPassword(pass, confirm_pass) {
    return (userform) => {
      let passControl = userform.controls[pass];
      let confirmControl = userform.controls[confirm_pass];

      if (passControl.value !== confirmControl.value) {
        confirmControl.setErrors({ match: true });
      }
    };
  }

  resetPassword(formdata) {
    console.log(this.otp);
    if (this.otp == formdata.otp) {
      console.log('Correct OTP');
      this.userservice
        .update(this.forgotuser._id, { password: formdata.confirm })
        .subscribe((res) => {
          console.log(res);
          Swal.fire({
            title: 'Success',
            text: 'Successfully updated your password',
            icon: 'success',
            background: '#151a30',
          }).then(() => {
            this.router.navigate(['/app/login']);
          });
        });
    } else {
      alert('Invalid OTP');
    }
  }

  sendOTP(email) {
    this.userservice.getUserByEmail(email).subscribe((user: any) => {
      if (user) {
        this.forgotuser = user;
        console.log('user found');
        this.showReset = true;
        this.otp = Math.floor(1000 + Math.random() * 9000);
        this.sendmail({
          to: email,
          message: `Your OTP for reseting password is ${this.otp}`,
        }).subscribe((data) => {
          console.log(data);
        });
      } else {
        Swal.fire({
          title: 'OOps!!',
          text: 'Enter your Registered Email',
          icon: 'error',
          background: '#151a30',
        }).then(() => {
          return;
        });
        return;
      }
    });
  }

  sendmail(data) {
    return this.http.post(this.url + '/util/sendmail', data);
  }
}
