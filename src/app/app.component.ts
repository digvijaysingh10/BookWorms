import { Component } from '@angular/core';
import { NgsRevealConfig } from 'ngx-scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bookWorms';

  constructor(config: NgsRevealConfig) {
    config.duration = 500;
    config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
    config.origin = 'left';
    config.distance = '100px';
  }
}
