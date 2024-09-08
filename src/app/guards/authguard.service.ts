import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private authservice:UserService,private router:Router) {

  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
  const token = this.getToken();
  if(!token){
  if(typeof window !== 'undefined'){
    alert('You are not authorized to view this page');
  }
    this.router.navigate(['/login']);
    return false;
  }
    return true;
 }

 canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
  const token = this.getToken();
  if(!token){
    alert('You are not authorized to view this page');
    this.router.navigate(['/login']);
    return false;
  }
    return true;

 }
}
