import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";




export const authGuard: CanActivateFn = (route, state) => {
    const _Router = inject(Router);
  
    // if (localStorage.getItem('token')) {
    //   return true;
    // } else {
    //   _Router.navigate(['/login']);
    //   return false;
    // }

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token') ) {
        return true;
      } else {
        _Router.navigate(['/login']);
        return false;
        

    }

    }
    return false;

  };

  export const authGuardLogin: CanActivateFn = (route, state) => {
    const _Router = inject(Router);
    const cookiesservice = inject(CookieService);
  
    // if (localStorage.getItem('_token')) {
    //   _Router.navigate(['/home']);
    //   return false;
    // } else {
    //   return true;
    // }

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token') && cookiesservice.get('taalam')) {
        _Router.navigate(['/home']);
        return false;
      } else {
        return true;
        
    }
    }
    return false;
  };

