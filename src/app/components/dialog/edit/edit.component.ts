import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  submit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
  }

  formControl = new FormControl('',Validators.required);
  emailControl = new FormControl('', [Validators.required,
                  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  ageControl = new FormControl('',  [Validators.required, 
                  Validators.min(18), 
                  Validators.max(80), 
                  Validators.pattern(/^\d{1,2}$/)]);
  phoneControl = new FormControl('',[Validators.required, 
                  Validators.pattern(/^\+\d{1,3}\s\(\d{1,3}\)\s\d{3}-\d{4}$/)]);
  integerControl = new FormControl('', [Validators.pattern(/^\d{1,6}$/)]);
  decimalControl = new FormControl('', [Validators.required,
                    Validators.pattern(/^\d{1,6}(.\d{0,2})?$/)]);

  getErrorMessage() {
    return  this.formControl.errors['required'] ? 'Required field': ''; 
  }

  getErrorMessageEmail() {
    return  this.emailControl.errors['pattern'] ? 'Please enter a valid email address': 
            this.emailControl.errors['required'] ? 'Required field email': '';
  }

  getErrorMessageAge() {
    return  this.ageControl.errors['pattern'] ? 'Only numbers':
            this.ageControl.errors['min'] ? 'Age should be > 17': 
            this.ageControl.errors['max'] ? 'Age should be < 81':
            this.ageControl.errors['required'] ? 'Required field age': '';
  }

  getErrorMessagePhone() {
    return  this.phoneControl.errors['pattern'] ? 'Format phone +XXX (XXX) XXX-XXXX': 
            this.phoneControl.errors['required'] ? 'Required field phone': '';
  }

  getErrorMessageInteger() {
    return  this.integerControl.errors['pattern'] ? 'Only numbers': '';
  }

  getErrorMessageDecimal() {
    return  this.decimalControl.errors['pattern'] ? 'Only numbers / Format XXXXXX.XX ': 
            this.decimalControl.errors['required'] ? 'Required field': '';
  }

  changeValue(key, newValue) {
    this.data.skills[key] =  newValue;
  }

}
