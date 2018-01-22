import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  templateUrl: 'fleet.component.html'
})
export class FleetComponent {

  rows = [];

  temp = [];

  columns = [
    { prop: 'BusNo' },
    { name: 'Odometer' },
    { name: 'Tripmileage' },
    { name: 'Engine' },
    { name: 'Online' },
    { name: 'Updated' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/fleet.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
