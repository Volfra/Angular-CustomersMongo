import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-query1',
  templateUrl: './query1.component.html',
  styleUrls: ['./query1.component.css']
})
export class Query1Component implements OnInit {

  constructor(public dialogRef: MatDialogRef<Query1Component>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  submit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
  }

  integerControlMin = new FormControl('', [Validators.required, Validators.pattern(/^\d{1,6}$/)]);
  integerControlMax = new FormControl('', [Validators.required, Validators.pattern(/^\d{1,6}$/)]);

  getErrorMessageIntegerMin() {
    return this.integerControlMin.errors['pattern'] ? 'Only numbers' : 
            this.integerControlMin.errors['required'] ? 'Required Minimum Value': '';
  }

  getErrorMessageIntegerMax() {
    return this.integerControlMax.errors['pattern'] ? 'Only numbers' : 
            this.integerControlMax.errors['required'] ? 'Required Maximum Value': '';
  }

}

