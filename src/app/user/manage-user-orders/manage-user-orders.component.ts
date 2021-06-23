import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { app_config } from 'src/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-user-orders',
  templateUrl: './manage-user-orders.component.html',
  styleUrls: ['./manage-user-orders.component.css'],
})
export class ManageUserOrdersComponent implements OnInit {
  url = app_config.api_url + '/';
  ordersList: any;
  rentOrders;
  purchaseOrders;
  loading = true;

  constructor(
    public orderService: OrderService,
    private router: Router,
    private userservice: UserService,
    private toastr: NbToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUserOrder();
  }

  fetchUserOrder() {
    this.orderService
      .getUserOrders(this.userservice.currentUser._id)
      .subscribe((data) => {
        console.log(data);
        this.ordersList = data;
        this.loading = false;
        this.filterOrders(data);
      });
  }

  filterOrders(list) {
    this.purchaseOrders = list.filter((order) => order.data.purchase);
    this.rentOrders = list.filter((order) => order.data.rent);
  }
}
