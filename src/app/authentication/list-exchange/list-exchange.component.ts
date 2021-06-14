import { LabelType, Options } from '@angular-slider/ngx-slider';
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
  selGenre = 'all';
  minValue: number = 0;
  maxValue: number = 5000;
  options: Options = {
    floor: this.minValue,
    ceil: this.maxValue,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min </b> ₹' + value;
        case LabelType.High:
          return '<b>Max </b> ₹' + value;
        default:
          return '$' + value;
      }
    },
  };
  constructor(private novelService: NovelService) {}

  ngOnInit(): void {
    this.fetchNovels();
  }

  fetchNovels() {
    this.novelService.getExchangeNovel().subscribe((data) => {
      this.novelList = data;
      console.log(data);
    });
  }

  searchNovelByTitle(name) {
    this.novelService.getExchangeNovel().subscribe((data: any) => {
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
