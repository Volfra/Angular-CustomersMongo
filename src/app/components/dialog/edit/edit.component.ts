import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, RequiredValidator, Validators } from '@angular/forms';
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

  userForm = new FormGroup({
    formControl : new FormControl('',[Validators.required]),
    emailControl: new FormControl('',[Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    ageControl: new FormControl('',  [Validators.min(18), Validators.max(90)])
  });

  getErrorMessage() {
    console.log(this.userForm.get('emailControl').value)
    return this.userForm.get('emailControl').value ? 'Required field': 
            this.userForm.get('emailControl').value.pattern ? 'Please enter a valid email address': '';
  }

  changeValue(key, newValue) {
    this.data.skills[key] =  newValue;
  }

}
