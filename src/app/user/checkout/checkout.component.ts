import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
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
  checkOutDetails: any;
  url = app_config.api_url + '/create-payment-intent';
  orderdata = JSON.parse(sessionStorage.getItem('orderdata'));

  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private orderService: OrderService,
    private fb: FormBuilder,

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

    console.log(this.orderdata);

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

  saveOrder() {
    let order = {};
    order['user'] = this.userService.currentUser._id;
    order['data'] = this.orderdata;
    order['created'] = new Date();

    this.orderService.addOrder(order).subscribe((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Hurray!',
        text: 'You have successfully placed order',
      });
    });
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
            // Swal.fire
            console.log(result);
            that.saveOrder();
            that.router.navigate(['/user/manageorder']);
          }
        }
      });
  }

  getIntent(e) {
    e.preventDefault();
    this.http
      .post(this.url, { amount: this.getPrice() * 100 })
      .subscribe((data) => {
        console.log(data);
        this.completePayment(data['client_secret'], this);
        console.log(this.card);
      });
  }

  getPrice() {
    if (this.orderdata.rent) {
      return this.orderdata.novel.rentPrice;
    } else if (this.orderdata.purchase) {
      return this.orderdata.novel.price;
    }
  }

  initcheckOutDetails() {
    this.checkOutDetails = this.fb.group(
      {
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        created: new Date(),
      });
  }

  submitCheckOutDetails(){
    if (!this.checkOutDetails.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Ooops!',
        text: 'Please enter valid details',
      });
      return;
    }
  }
}
