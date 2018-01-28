import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'snapshot.component.html'
})
export class SnapshotComponent {
  private id$: Observable<string>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id$ = this.route.paramMap
      .map((params: ParamMap) => { 
        return params.get('id');
      });
  }

  ngOnDestroy(): void {
    this.id$ = null;
  }
}
