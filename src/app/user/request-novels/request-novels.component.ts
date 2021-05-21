import { Component, OnInit, } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-request-novels',
  templateUrl: './request-novels.component.html',
  styleUrls: ['./request-novels.component.css']
})
export class RequestNovelsComponent implements OnInit {

  enteredTitle ='';
  enteredContent = '';
  posts = [];



  constructor(
    private toastr: NbToastrService,
    private requestservice : RequestService,
    private userservice : UserService) {}

    onAddPost(){
        const post = {
          title: this.enteredTitle,
          content: this.enteredContent,
          user: this.userservice.currentUser._id
        }
        this.requestservice.addrequest(post).subscribe((res) => {
          console.log(res);
          this.toastr.success('Request Added', 'Successfully!');
        });

      }



  ngOnInit(): void {
    document
      .getElementsByTagName('nb-layout-column')[0]
      .classList.add('register');
  }

  ngOnDestroy() {
    document
      .getElementsByTagName('nb-layout-column')[0]
      .classList.remove('register');
  }

}
