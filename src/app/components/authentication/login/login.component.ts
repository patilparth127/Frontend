import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
token:any

  constructor(private formBuilder: FormBuilder, private user:UserService, private router:Router,private snackbar:MatSnackBar) { }



  ngOnInit(): void {
   // localStorage.setItem("token",this.token);
    this.loginForm = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [true, Validators.requiredTrue]
  });
  }

      // convenience getter for easy access to form fields
      get f() { return this.loginForm.controls; }

      onSubmit() {
          this.submitted = true;
  
          // stop here if form is invalid
          if (this.loginForm.valid) {
              let payload = {
                email: this.loginForm.value.email,
                password: this.loginForm.value.password,
                service:'advance'
              }
    
              this.user.LogIn(payload).subscribe((isLoggedIn: any) => {
                if (isLoggedIn) {
                  localStorage.setItem('token', 'ksjdfhhfsdkjskdfh');
                  this.router.navigateByUrl('/dashboard');
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
                } else {
                  Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Invalid credentials",
                    showConfirmButton: false,
                    timer: 1500
                  });                  
                }
              });
              
          }
          
      }

}
