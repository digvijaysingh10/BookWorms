import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { app_config } from 'src/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: any;
  price = 100;
  url = app_config.api_url + '/create-payment-intent';

  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple',
        },
      },
    };

    this.card = elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  completePayment(secret, obj) {
    const that = obj;
    stripe
      .confirmCardPayment(secret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: this.userService.currentUser.fullname,
          },
        },
      })
      .then(function (result) {
        if (result.error) {
          console.log(result.error.message);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            console.log(result);
            that.Swal.fire({
              icons: 'success',
              title: 'Hurray!',
              text: 'Payment done',
            });
          }
        }
      });
  }

  getIntent(e) {
    e.preventDefault();
    this.http.post(this.url, { amount: this.price * 100 }).subscribe((data) => {
      console.log(data);
      this.completePayment(data['client_secret'], this);
      console.log(this.card);
    });
  }
}
