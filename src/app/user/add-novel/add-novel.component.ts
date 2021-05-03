import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NovelService } from 'src/app/services/novel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-novel',
  templateUrl: './add-novel.component.html',
  styleUrls: ['./add-novel.component.css']
})
export class AddNovelComponent implements OnInit {

  novelform: any;
  novelImage: any;
  erroMsg: string;
  imgURL: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private novelService: NovelService,


  ) {}

  ngOnInit(): void {
    this.initNovelForm();
    document
      .getElementsByTagName('nb-layout-column')[0]
      .classList.add('register');
  }

  ngOnDestroy() {
    document
      .getElementsByTagName('nb-layout-column')[0]
      .classList.remove('register');
  }

  initNovelForm() {
    this.novelform = this.fb.group({
      user:this.userService.currentUser,
      title : '',
      desc : '',
      author : '',
      avatar : '',
      genre : '',
      created : new Date(),
      price : 0,
      rating : 0,
      rentable : false,
      exchangable : false,
      soldable : false,
      rentPrice : 0,
    });
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
      this.erroMsg = 'Only images are supported.';
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
    formdata.avatar = this.novelImage;

    this.novelService.addNovel(formdata).subscribe((res) => {
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
