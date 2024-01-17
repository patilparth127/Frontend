import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardServiceService } from '../services/authguardService/authguard-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
   constructor(private Authguardservice:AuthguardServiceService, private router:Router ) { }

  canActivate():boolean{
  if (!this.Authguardservice.gettoken()) {  
     this.router.navigateByUrl('/');
   }  
   return this.Authguardservice.gettoken(); 
 }
  
}
