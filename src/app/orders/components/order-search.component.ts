import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-search',
  template: `
  <br>
  <form [formGroup]="searchGroup">
    <mat-card>
        <mat-card-content>
            <small><b>Search order</b></small>
            <mat-form-field>
                  <input matInput [matDatepicker]="picker1" placeholder="Choose start date" formControlName="startDate" required>
                  <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
                  <mat-datepicker #picker1></mat-datepicker>
            </mat-form-field>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <mat-form-field>
                  <input matInput [matDatepicker]="picker2" placeholder="Choose end date" formControlName="endDate" required>
                  <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
                  <mat-datepicker #picker2></mat-datepicker>
            </mat-form-field>
            <mat-spinner [class.show]="searching" [diameter]="30" [strokeWidth]="3"></mat-spinner>
            <button mat-raised-button color="accent" [disabled]="!searchGroup.valid" (click) = "executeSearch()">
                <mat-icon>search</mat-icon>Search
            </button>
        </mat-card-content>
  </mat-card>
</form>
  `,
  styles: [
    `
    mat-card-title,
    mat-card-content,
    mat-card-footer {
      display: flex;
      justify-content: center;
    }

    mat-card-footer {
      color: #FF0000;
      padding: 5px 0;
    }

    .mat-form-field {
      min-width: 300px;
    }

    .mat-spinner {
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
      padding-left: 60px; // Make room for the spinner
    }

    .mat-spinner.show {
      opacity: 1.0;
    }
  `,
  ],
})
export class OrderSearchComponent implements OnInit {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<object>();
  searchGroup: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit () {
    this.searchGroup = this.fb.group(
      {
        startDate: '',
        endDate: ''
      }
    );
  }

  executeSearch () {
    this.search.emit({startDate: this.searchGroup.get('startDate').value, endDate: this.searchGroup.get('endDate').value});
  }
}
