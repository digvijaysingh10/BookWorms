import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { UserService } from 'src/app/services/user.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  url = app_config.api_url + '/';
  title = app_config.title;


  sidebarItems = [
    {
      title: 'Profile',
      icon: 'person',
      link: 'profile',
    },
    {
      title: 'Manage Users',
      icon: 'people',
      link: 'manageuser',
    },
    {
      title: 'View Dashboard',
      icon: 'eye',
      link: 'dashboard',
    },
    {
      title: 'List Novels',
      icon: 'book-open',
      link: 'managenovels'
    }

  ];

  constructor(public userService: UserService,  private sidebar: NbSidebarService) {}

  ngOnInit(): void {}

  toggle() {
    this.sidebar.toggle();
  }
}
