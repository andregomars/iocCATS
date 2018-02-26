import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup,
  FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { FormArray } from '@angular/forms/src/model';
import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'pmn-setting.component.html',
  styles: [`.ui-select-choices.dropdown-menu {
    display: block;
    }`]
})
export class PmnSettingComponent implements OnInit {
  vehicles: Array<string>;
  pmnSettingForm: FormGroup;
  itemNames: Array<string>;
  units: Array<any>;
  unitValues: Array<string>;
  operands: Array<any>;
  operandValues: Array<string>;
  notificationTypes: Array<string>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private dataService: RemoteDataService
  ) { }

  get pmnSettingArray(): FormArray {
    return this.pmnSettingForm.get('pmnSettingArray') as FormArray;
  }

  private vehicleId = 1;
  private userName = 'u001';

  ngOnInit(): void {
    this.initSelectOptions();

    this.pmnSettingForm = this.fb.group({
      pmnSettingArray: this.fb.array([])
    });

    this.dataService.getVehicleMaintSetting(this.vehicleId, this.userName)
      .map(r => r.notification_setting_items)
      .subscribe((data: Array<any>) => {
        const fgList = data.map(g => this.fb.group(g));
        const fgArray = this.fb.array(fgList);
        this.pmnSettingForm.setControl('pmnSettingArray', fgArray);
      });
  }

  initSelectOptions(): void {
    this.itemNames = ['Engine oil', 'Coolant', 'Front door',
      'Rear door', 'High beam', 'Low beam'];

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

  addNewLine(): void {
    const newLine = {
      notification_item_id: 0,
      item_name: 'Engine oil',
      mileage_usage: null,
      date_usage: null,
      hours_usage: null,
      usage_count: null,
      operand: null,
      usage_value: null,
      unit_type: null,
      notificate_type: 'Display'
    };
    this.pmnSettingArray.push(this.fb.group(newLine));
  }

  removeLine($event, i): void {
    $event.preventDefault();
    if (this.pmnSettingArray && this.pmnSettingArray.length > 0) {
      this.pmnSettingArray.removeAt(i);
    }
  }
}

