import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const service = inject(AuthService);
  const router = inject(Router);
  if (service.isLoggedIn()) {
    return true;
  } else {
    alert('Access denied !! Please Login');
    router.navigateByUrl('');
    return false;
  }
};
