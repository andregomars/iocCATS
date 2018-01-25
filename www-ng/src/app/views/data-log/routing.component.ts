import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'routing.component.html'
})
export class RoutingComponent {
  rowsRouting = [];
  colsRouting = [
    { name: 'Filetime' },
    { name: 'Busno' },
    { name: 'Filename' },
    { name: 'Download' }
 ];

  constructor() {
    this.fetch((data) => {
      this.rowsRouting = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/routing.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
