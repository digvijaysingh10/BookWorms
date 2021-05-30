import { Injectable } from '@angular/core';
import { app_config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = app_config.api_url + '/order';
  constructor() { }
}
