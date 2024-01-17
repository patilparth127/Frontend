import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:any;

  constructor(private httpService : HttpService) {
    this.token = localStorage.getItem('token');
   }

   LogIn(reqdata: any): Observable<any> {
  
    return this.httpService.getService('/Users', false).pipe(
      map((data: any) => {
        return data.some((user: { email: any; password: any; }) => user.email === reqdata.email && user.password === reqdata.password);
      })
    );
  }

  Registration(reqdata:any){

    return this.httpService.postService('/Users',reqdata,false);
  }

  ForgetPassword(reqdata:any){

    return this.httpService.postService('User/ForgetPassword?email='+(reqdata.email),reqdata,false);
  }

  Reset(reqdata:any,token:any){
    return this.httpService.putService(`User/ResetPassword?newPassword=${reqdata.newPassword}&confirmPassword=${reqdata.confirmPassword}`,reqdata,true);
  }

}
 