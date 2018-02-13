import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup,
  FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { FormArray } from '@angular/forms/src/model';

@Component({
  templateUrl: 'pmn-setting.component.html'
})
export class PmnSettingComponent implements OnInit {
  rows$: Observable<any>;
  pmnSettingForm: FormGroup;
  notificationTypes: Array<string>;
  units: Array<any>;
  unitValues: Array<string>;
  operands: Array<any>;
  operandValues: Array<string>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  get pmnSettingArray() { return this.pmnSettingForm.get('pmnSettingArray'); }

  private vehicleId = '0001';
  private url = `assets/data/vehicle/preventiveNotifItemSetting/${ this.vehicleId }.json`;

  ngOnInit(): void {
    // this.rows$ = this.http.get<any>(this.url)
    //   .map(r => r.notification_items)
    //   .catch(e => new EmptyObservable());
    this.initSelectOptions();

    this.pmnSettingForm = this.fb.group({
      pmnSettingArray: this.fb.array([])
    });

    this.http.get<any>(this.url)
      .map(r => r.notification_items)
      .subscribe((data: Array<any>) => {
        const fgList = data.map(g => this.fb.group(g));
        const fgArray = this.fb.array(fgList);
        this.pmnSettingForm.setControl('pmnSettingArray', fgArray);
      });
  }

  initSelectOptions(): void {
    this.operands = [
      { name: '', value: null },
      { name: '<', value: 'less-than' },
      { name: '>', value: 'greater-than' },
      { name: '=', value: 'equal' },
      { name: '<=', value: 'less-than_equal-to' },
      { name: '>=', value: 'greater-than_equal-to' },
      { name: '!=', value: 'not equal' }
    ];
    this.operandValues = this.operands.map(x => x.value);

    this.units = [
      { name: '', value: null },
      { name: 'n', value: 'count' },
      { name: '%', value: 'usage' }
    ];
    this.unitValues = this.units.map(x => x.value);

    this.notificationTypes = ['Display', 'Display And Email'];
  }

}

