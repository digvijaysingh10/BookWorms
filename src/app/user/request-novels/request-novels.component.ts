import { Component, OnInit, } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-request-novels',
  templateUrl: './request-novels.component.html',
  styleUrls: ['./request-novels.component.css']
})
export class RequestNovelsComponent implements OnInit {

  enteredTitle ='';
  enteredContent = '';

  posts = [];

  onAddPost(){
    const post = {
      title: this.enteredTitle,
      content: this.enteredContent,
    }
    this.posts.push(post)
    // this.toastr.success('Post Added', 'Successfully!');
  }

  constructor(private toastr: NbToastrService) {}

  ngOnInit(): void {
  }

}
