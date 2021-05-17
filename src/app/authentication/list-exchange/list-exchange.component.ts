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
  minValue: number = 0;
  maxValue: number = 9999;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Max </b> ₹' + value;
        case LabelType.High:
          return '<b>Min </b> ₹' + value;
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
    });
  }

  applyFilter() {}
}
