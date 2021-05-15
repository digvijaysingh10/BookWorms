import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-request-novels',
  templateUrl: './request-novels.component.html',
  styleUrls: ['./request-novels.component.css']
})
export class RequestNovelsComponent implements OnInit {

  enteredValue ='';
  newPost = '';

  onAddPost(){

    this.newPost = this.enteredValue
    // this.toastr.success('Post Added', 'Successfully!');
  }

  constructor(private toastr: NbToastrService) {}

  ngOnInit(): void {
  }

}
