import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http/src/module';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'fleet.component.html'
})
export class FleetComponent {
  rows = [];
  temp = [];
  data$: Observable<any>;
  dataLocalUrl = `assets/data/fleet/AVTA.json`;
  dataRemoteUrl = `https://ioccatsdemo.firebaseio.com/fleet/AVTA.json`;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.data$ = this.http.get<any>(this.dataRemoteUrl);
    this.http.get<any>(this.dataRemoteUrl).subscribe(data => {
      this.temp = [...data.vehicles];
      this.rows = data.vehicles;
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(row => {
      return row.bus_number.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
