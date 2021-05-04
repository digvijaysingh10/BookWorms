import { Component, OnInit } from '@angular/core';
import { NovelService } from 'src/app/services/novel.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-list-sell',
  templateUrl: './list-sell.component.html',
  styleUrls: ['./list-sell.component.css']
})
export class ListSellComponent implements OnInit {

  novelList;
  url = app_config.api_url + '/';
  constructor(private novelService: NovelService) {}

  ngOnInit(): void {
    this.fetchNovels();
  }

  fetchNovels() {
    this.novelService.getSellNovel().subscribe((data) => {
      this.novelList = data;
    });
  }

}
