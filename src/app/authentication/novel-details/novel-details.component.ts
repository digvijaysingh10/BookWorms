import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NovelService } from 'src/app/services/novel.service';
import { UserService } from 'src/app/services/user.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-novel-details',
  templateUrl: './novel-details.component.html',
  styleUrls: ['./novel-details.component.css'],
})
export class NovelDetailsComponent implements OnInit {
  novelData;
  url = app_config.api_url + '/';
  constructor(
    private actRoute: ActivatedRoute,
    private novelService: NovelService,
    private userService : UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.novelService.getbyid(id).subscribe((data) => {
      this.novelData = data;
      console.log(data);
    });
  }

  purchase() {
    let obj = {};
    obj['purchase'] = true;
    obj['novel'] = this.novelData;
    sessionStorage.setItem('orderdata', JSON.stringify(obj));
    this.router.navigate(['/user/checkout']);
  }

  rent() {
    let obj = {};
    obj['rent'] = true;
    obj['novel'] = this.novelData;
    sessionStorage.setItem('orderdata', JSON.stringify(obj));
    this.router.navigate(['/user/checkout']);
  }

  repondToUser(user_id) {
    this.userService
      .addContact(this.userService.currentUser._id, user_id)
      .subscribe((res) => {
        console.log(res);
        this.userService.refreshUser();
        this.router.navigate(['/user/chat']);
      });
  }
}
