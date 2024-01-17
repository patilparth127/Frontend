import { HttpClient } from '@angular/common/http';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from 'src/app/services/dataService/data-service.service';

import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DilogboxComponent } from '../dilogbox/dilogbox.component';

export interface FileList {
  readonly length: number;
  item(index: number): File | null;
  [index: number]: File;
}
export interface Customer {
  customerName: string;
  address: string;
  state: string;
  city: string;
  dob: string;
}
interface CityMap {
  [key: string]: string[];
}
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  @Output() newItemEvent = new EventEmitter<boolean>();

  selectedFile: File | null = null;

  states: string[] = ['Gujarat'];
  cities: CityMap = {
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  };
  displayedColumns: string[] = [
    'customerName',
    'address',
    'state',
    'city',
    'dob',
    'file',
    'edit',
    'delete',
  ];

  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  dialogRef: MatDialogRef<DilogboxComponent, any> | undefined;
  inputfromdeshboard: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private service: DataServiceService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getdata();
    this.form = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]], // Allow only letters and spaces
      address: ['', [Validators.required, Validators.minLength(10)]], // Require at least 10 characters
      state: ['', Validators.required],
      city: ['', Validators.required],
      dob: ['', [Validators.required]], // Enforce YYYY-MM-DD format
      file: [null, Validators.required],
    });
    
    this.form?.get('city')?.setValue(this.cities['Gujarat'][0]);
    this.inputfromdeshboard =  this.service.boolkey 
    this.dataSource.paginator = this.paginator;

  }

  openDilog(data: any) {
    this.dialogRef = this.dialog.open(DilogboxComponent, {
      data: data,
    });
  
    this.dialogRef.afterClosed().subscribe(() => {
      this.getdata();    });
  }

  onSubmit() {
    if (this.form.valid) {
      const newData = this.form.value;
  
      const existingData = this.dataSource.data.find((data: { customerName: any; }) => data.customerName === newData.customerName);
  
      if (!existingData) {
        this.service.Adddata(newData)
          .subscribe(() => {
            this.form.reset(); 
            this.inputfromdeshboard = false; 
            this.getdata()
            // Refresh dataSource if needed
          });
      } else {
        Swal.fire({
          icon: 'warning', 
          title: "Oops! Customer Already Exists",
          text: "A customer with that name is already in the system. Please choose a different name.",
          timer: 3000, 
        });
            }
    }
  }

  getdata() {
    this.service.getdata().subscribe((data: any[]) => {
      const newData = data.map((item) => ({
        ...item,
        file: `data:image/png;base64,${item.file}`,
      }));
      this.dataSource = new MatTableDataSource(newData);
    });
  }

  onStateChange() {
    const selectedState = this.form.get('state')?.value;
    const citiesForState = this.cities[selectedState];
    this.form.get('city')?.setValue(citiesForState[0]);
  }

  deleteItem(data: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(data.id).subscribe((data: any[]) => {
    this.getdata()

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }) 
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
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

  onToggleInputForm() {
  this.inputfromdeshboard = !this.inputfromdeshboard;
}
}


