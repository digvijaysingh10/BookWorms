import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
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
      title : '',
      desc : '',
      author : '',
      genre : '',
      created : new Date(),
      price : 0,
      rating : 0,
      rentable : true,
      exchangable : true,
      soldable : true,
      rentPrice : 0,
      toppings : '',

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
    this.userService.uploadAvatar(formData).subscribe((response) => {
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
    this.userService.addUser(formdata).subscribe((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Great!',
        text: 'Successfully Registered, Now Login to Continue.',
      }).then(() => {
        this.router.navigate(['/app/signin']);
      });
    });
  }

  SelectCustomTriggerExample () {
    toppings = new FormControl();

    toppingList: String[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  }

}
