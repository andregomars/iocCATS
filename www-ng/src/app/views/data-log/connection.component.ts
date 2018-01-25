import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'connection.component.html'
})
export class ConnectionComponent {
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

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/connection.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
