import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NovelService } from 'src/app/services/novel.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-novel-details',
  templateUrl: './novel-details.component.html',
  styleUrls: ['./novel-details.component.css']
})
export class NovelDetailsComponent implements OnInit {

  novelData;
  url = app_config.api_url + '/';
  constructor(
    private actRoute: ActivatedRoute,
    private novelService: NovelService,
  ) {}

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.novelService.getbyid(id).subscribe((data) => {
      this.novelData = data;
    });
  }
}
