import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Driver } from '../../../models/driver.model';

@Component({
  selector: 'app-edit-driver-dialog',
  templateUrl: './edit-driver-dialog.component.html',
  styleUrls: ['./edit-driver-dialog.component.css']
})
export class EditDriverDialogComponent {
  editDriverForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDriverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { driver: Driver },
    private fb: FormBuilder
  ) {
    this.editDriverForm = this.fb.group({
      name: [data.driver.name, Validators.required],
      email: [data.driver.email, [Validators.required, Validators.email]],
      phone: [data.driver.phone, Validators.required]
    });
  }

  onSubmit(): void {
    const updatedDriver: Driver = {
      ...this.data.driver,
      name: this.editDriverForm.value.name,
      email: this.editDriverForm.value.email,
      phone: this.editDriverForm.value.phone
    };
    this.dialogRef.close(updatedDriver);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
