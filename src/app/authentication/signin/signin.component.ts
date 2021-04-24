import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleSignUp(){
    document.getElementById('container').classList.add("right-panel-active");
  }

  toggleSignIn(){
    document.getElementById('container').classList.remove("right-panel-active");
  }
}
