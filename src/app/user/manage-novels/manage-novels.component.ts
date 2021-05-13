import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NovelService } from 'src/app/services/novel.service';
import { UserService } from 'src/app/services/user.service';
import { app_config } from 'src/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-novels',
  templateUrl: './manage-novels.component.html',
  styleUrls: ['./manage-novels.component.css'],
})
export class ManageNovelsComponent implements OnInit {
  url = app_config.api_url + '/';
  novelsList: any;
  rentNovels: any;
  exchangeNovels: any;
  sellNovels: any;
  loadingNovels = true;
  novelform: any;
  novelToUpdate;
  showUpdateForm = false;
  imgURL: string | ArrayBuffer;
  novelImage: any;

  constructor(
    public novelService: NovelService,
    private router: Router,
    private userservice: UserService,
    private toastr: NbToastrService,
    private fb: FormBuilder
  ) {}

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
    this.novelService
      .getNovelByUser(this.userservice.currentUser._id)
      .subscribe((res) => {
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

  updateNovel(noveldata) {
    console.log(noveldata);
    this.novelToUpdate = noveldata;
    this.initNovelForm(noveldata);
  }

  initNovelForm(novelData) {
    this.novelform = this.fb.group(novelData);
    this.showUpdateForm = true;
  }

  uploadNovel(event: any) {
    let files = event.target.files;
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      Swal.fire('Images Only');
      return;
    }
    this.preview(event.target.files);
    let formData = new FormData();
    this.novelImage = files[0].name;
    formData.append('image', files[0], files[0].name);
    this.novelService.uploadAvatar(formData).subscribe((response) => {
      console.log(response);
    });
  }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  submitNovelForm() {
    let formdata = this.novelform.value;
    // formdata.avatar = this.novelImage;

    this.novelService.update(formdata._id, formdata).subscribe((res) => {
      console.log(formdata);
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Great!',
        text: 'Novel Successfully Saved!!!',
      }).then(() => {
        this.router.navigate(['/user/addnovel']);
      });
    });
  }
}
