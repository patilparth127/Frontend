import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder, private user:UserService,private snackbar:MatSnackBar,private router : Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        acceptTerms: [true, Validators.requiredTrue]
    },);
}

get f() { return this.registerForm.controls; }

onSubmit() {
    this.submitted = true;
    if (!this.registerForm.invalid) {
      let payload = {
        firstName:this.registerForm.value.firstName,
        lastName:this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        service:'advance'
      }
      this.user.Registration(payload).subscribe((response:any) =>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500
        });
        return this.router.navigateByUrl('/')
      })
    }
}

}
