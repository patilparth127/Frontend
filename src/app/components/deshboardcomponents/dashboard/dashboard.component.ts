import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/dataService/data-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mobileQuery: MediaQueryList;
  value: any;
  message:any;
  dynamicComponentSelector: string = '';

  subscription: any;
  constructor( media: MediaMatcher,private route: Router,
    private data:DataServiceService, private snackbar:MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }
  
  ngOnInit(): void {

  }

  OnLogout(){
    localStorage.removeItem("token");
    this.route.navigateByUrl('/');
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logout Successful",
      showConfirmButton: false,
      timer: 1500
    });
  }

}
