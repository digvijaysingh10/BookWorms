import { Inject, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { app_config } from 'src/config';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.css'],
})
export class RequestDialogComponent implements OnInit {
  url = app_config.api_url + '/';
  constructor(
    public dialogRef: MatDialogRef<RequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public requestData
  ) {}

  ngOnInit(): void {
    console.log(this.requestData);
  }
}
