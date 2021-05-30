import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NovelService } from 'src/app/services/novel.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersList: any;
  loadingUsers = true;
  novelsList: any;
  rentNovels: any;
  exchangeNovels: any;
  sellNovels: any;
  loadingNovels = true;

  constructor(
    public userService: UserService,
    public novelService: NovelService,
    public orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchNovels();
  }

  fetchUsers() {
    this.userService.getAll().subscribe((res) => {
      this.usersList = res;
      this.loadingUsers = false;
    });
  }

  filterNovels() {
    this.rentNovels = this.novelsList.filter((novel) => novel.rentable);
    console.log(this.rentNovels);
    this.exchangeNovels = this.novelsList.filter((novel) => novel.exchangable);
    console.log(this.exchangeNovels);
    this.sellNovels = this.novelsList.filter((novel) => novel.soldable);
    console.log(this.sellNovels);
  }

  fetchNovels() {
    this.novelService
      .getNovelByUser(this.userService.currentUser._id)
      .subscribe((res) => {
        this.novelsList = res;
        this.loadingNovels = false;
        console.log(this.novelsList);
        this.filterNovels();
      });
  }


}
