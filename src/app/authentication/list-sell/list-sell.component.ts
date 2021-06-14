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

  searchNovelByTitle(name) {
    this.novelService.getSellNovel().subscribe((data: any) => {
      this.novelList = data.filter((novel) =>
        novel.title.toLowerCase().includes(name.toLowerCase())
      );
      console.log(this.novelList);
    });
  }

  applyFilter() {
    this.novelService.getAll().subscribe((data: any) => {
      if (this.selGenre == 'all') {
        this.novelList = data.filter(
          (novel) => novel.price > this.minValue && novel.price < this.maxValue
        );
      } else {
        this.novelList = data.filter(
          (novel) =>
            novel.price > this.minValue &&
            novel.price < this.maxValue &&
            novel.genre.toLowerCase().includes(this.selGenre.toLowerCase())
        );
      }

      console.log(this.novelList);
    });
  }
}
