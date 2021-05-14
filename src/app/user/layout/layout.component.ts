import { Component, OnInit } from '@angular/core';
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

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  sidebarItems = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: 'profile',
    },
    {
      title: 'Add Novels',
      icon: 'book-open-outline',
      link: 'addnovel',
    },
    {
      title: 'Manage Novels',
      icon: 'person-outline',
      link: 'managenovel',
    },
  ];
}
