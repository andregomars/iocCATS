import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: 'connection.component.html'
})
export class ConnectionComponent implements OnInit {
  ngxControl: FormControl;
  months: Array<string>;

  rowsConnection = [];
  colsConnection = [
    { name: 'Filetime' },
    { name: 'Busno' },
    { name: 'Filename' },
    { name: 'Download' }
 ];

  constructor() {
    this.fetch((data) => {
      this.rowsConnection = data;
    });
  }

  ngOnInit(): void {
    this.initSelectBox();
  }

  initSelectBox(): void {
    this.ngxControl = new FormControl();
    this.months = ['201802', '201801', '201712'];
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/connection.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
