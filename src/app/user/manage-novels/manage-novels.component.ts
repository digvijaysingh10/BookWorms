import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NovelService } from 'src/app/services/novel.service';
import { app_config } from 'src/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-novels',
  templateUrl: './manage-novels.component.html',
  styleUrls: ['./manage-novels.component.css'],
})
export class ManageNovelsComponent implements OnInit {
  url = app_config.api_url+'/';
  novelsList: any;
  rentNovels: any;
  exchangeNovels: any;
  sellNovels: any;
  loadingNovels = true;

  constructor(public novelService: NovelService, private router: Router) {}

  ngOnInit(): void {
    this.fetchNovels();
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
    this.novelService.getAll().subscribe((res) => {
      this.novelsList = res;
      this.loadingNovels = false;
      console.log(this.novelsList);
      this.filterNovels();
    });
  }

  deleteNovel(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.novelService.deleteNovel(id).subscribe((res) => {
          console.log(res);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your blog has been deleted.',
            icon: 'info',
          }).then(() => {
            this.fetchNovels();
          });
        });
      }
    });
  }

  updateNovel(id) {}
}
