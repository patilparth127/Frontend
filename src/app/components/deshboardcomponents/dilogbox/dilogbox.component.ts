import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService } from 'src/app/services/dataService/data-service.service';
import Swal from 'sweetalert2';

interface CityMap {
  [key: string]: string[];
}

@Component({
  selector: 'app-dilogbox',
  templateUrl: './dilogbox.component.html',
  styleUrls: ['./dilogbox.component.scss']
})

export class DilogboxComponent implements OnInit {

    states: string[] = ['Gujarat'];
    cities: CityMap = {
      Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    };
  
    private _dimesionToggle = false;
    Datasource: any;
    form!: FormGroup;
  
    constructor(
      private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<DilogboxComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private service: DataServiceService
    ) {}
    
    ngOnInit(): void {
      this.Datasource = [this.data];
      this.getdata();
      this.form = this.formBuilder.group({
        customerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]], // Allow only letters and spaces
        address: ['', [Validators.required, Validators.minLength(10)]], // Require at least 10 characters
        state: ['', Validators.required],
        city: ['', Validators.required],
        dob: ['', [Validators.required]], // Enforce YYYY-MM-DD format
        file: [null, Validators.required],
      });
      this.form?.get('state')?.setValue(this.data.state);
      this.form?.get('customerName')?.setValue(this.data.customerName);
      this.form?.get('address')?.setValue(this.data.address);
      this.form?.get('dob')?.setValue(this.data.dob);
      this.form?.get('city')?.setValue(this.data.city);
      this.form?.get('file')?.setValue(this.data.file);
    }
  
    onStateChange() {
      const selectedState = this.form.get('state')?.value;
      const citiesForState = this.cities[selectedState];
      this.form.get('city')?.setValue(citiesForState[0]);
    }
    getdata() {}
    onSubmit() {
      if (this.form.valid) {
        this.service.EditData(this.form.value,this.data.id).subscribe((isLoggedIn: any) => {
          if (isLoggedIn) {
            this.dialogRef.close();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
          }
        });
      } else {
        console.log('Form is invalid');
      }
    }
    togglePosition(): void {
      this._dimesionToggle = !this._dimesionToggle;
      if (this._dimesionToggle) {
        this.dialogRef
          .updateSize('500px', '500px')
          .updatePosition({ top: '25px', left: '25px' });
      } else {
        this.dialogRef.updateSize().updatePosition();
      }
    }
  
    fileSelected(event: any) {
      const fileInput = event.target;
      const file = fileInput?.files?.[0];
      if (file) {
        this.service.convertFileToBase64(file).then((base64Data) => {
          this.form.patchValue({ file: base64Data });
        });
      } else {
        console.log('No file selected.');
      }
    }
  
  }

