import { Component, OnInit } from '@angular/core';
import { NovelService } from 'src/app/services/novel.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-list-exchange',
  templateUrl: './list-exchange.component.html',
  styleUrls: ['./list-exchange.component.css'],
})
export class ListExchangeComponent implements OnInit {
  novelList;
  url = app_config.api_url + '/';
  constructor(private novelService: NovelService) {}

  ngOnInit(): void {
    this.fetchNovels();
  }

  fetchNovels() {
    this.novelService.getExchangeNovel().subscribe((data) => {
      this.novelList = data;
    });
  }
}
