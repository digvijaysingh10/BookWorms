import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NovelService } from 'src/app/services/novel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-novels',
  templateUrl: './manage-novels.component.html',
  styleUrls: ['./manage-novels.component.css']
})
export class ManageNovelsComponent implements OnInit {

  novelsList: any;
  loadingNovels = true;

  constructor(public novelService: NovelService, private router: Router) {}

  ngOnInit(): void {
    this.fetchNovels();
  }

  fetchNovels() {
    this.novelService.getAll().subscribe((res) => {
      this.novelsList = res;
      this.loadingNovels = false;
    });
  }

  deleteUser(id) {
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
