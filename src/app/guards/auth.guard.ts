import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
    const _Router = inject(Router);
  
    // if (localStorage.getItem('token')) {
    //   return true;
    // } else {
    //   _Router.navigate(['/login']);
    //   return false;
    // }

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token')) {
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
  
    // if (localStorage.getItem('_token')) {
    //   _Router.navigate(['/home']);
    //   return false;
    // } else {
    //   return true;
    // }

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token')) {
        _Router.navigate(['/home']);
        return false;
      } else {
        return true;
        
    }
    }
    return false;
  };

