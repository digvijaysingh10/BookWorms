import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NovelService } from 'src/app/services/novel.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersList: any;
  loadingUsers = true;
  novelsList: any;
  rentNovels: any;
  exchangeNovels: any;
  sellNovels: any;
  loadingNovels = true;

  constructor(
    public userService: UserService,
    public novelService: NovelService,
    public orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchNovels();
  }

  fetchUsers() {
    this.userService.getAll().subscribe((res) => {
      this.usersList = res;
      this.loadingUsers = false;
    });
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
      .getNovelByUser(this.userService.currentUser._id)
      .subscribe((res) => {
        this.novelsList = res;
        this.loadingNovels = false;
        console.log(this.novelsList);
        this.filterNovels();
      });
  }

  drawchart(id, datapoints, title, unit, xlabel) {
    var chart = new CanvasJS.Chart(id, {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: title,
      },
      axisY: {
        title: xlabel,
        titleFontSize: 24,
      },
      data: [
        {
          type: 'column',
          yValueFormatString: `#,### ${unit}`,
          dataPoints: datapoints,
        },
      ],
    });
    chart.render();
  }

  prepareRegData(users) {
    this.getDatewiseValues(users, 'created').subscribe((data) => {
      console.log(data);
      let regData = data;
      this.drawchart(
        'regByDate',
        regData,
        'User Registration Data',
        'registration(s)',
        'No. of Registrations'
      );
    });
  }

  prepareComData(companies) {
    this.getDatewiseValues(companies, 'created').subscribe((data) => {
      console.log(data);
      let regData = data;
      this.drawchart(
        'companyByDate',
        regData,
        'Company Registration Data',
        'registration(s)',
        'No. of Registrations'
      );
    });
  }

  getDatewiseValues(records, colname) {
    console.log(records);
    return Observable.create((observer) => {
      let datewise = [];
      this.getUniqueValues(colname, records).subscribe((unique_values) => {
        for (let value of unique_values[1]) {
          console.log(value);
          datewise.push({
            x: new Date(value),
            y: this.getCount(unique_values[0], value),
          });
        }
        observer.next(datewise);
      });
    });
  }

  getUniqueValues(col_name, data) {
    // console.log(col_name+' '+data);
    return Observable.create((observer) => {
      let values = data.map((ele) => {
        let date = new Date(ele[col_name]).setHours(0, 0, 0, 0);
        // console.log(new Date(date).getTime());
        return new Date(date).getTime();
      });

      let uniquevalues = [];
      for (let value of values) {
        if (!uniquevalues.includes(value)) {
          uniquevalues.push(value);
          // console.log(value);
        }
      }
      observer.next([values, uniquevalues]);
    });
  }

  getCount(records, item) {
    let count = 0;
    for (let record of records) {
      if (record == item) {
        count++;
      }
    }

    return count;
  }

}
