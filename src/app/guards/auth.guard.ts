import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  // Get key from query param
  const urlParams = new URLSearchParams(state.url.split('?')[1]);
  const key = urlParams.get('key');
  const correctKey = 'UNIQUEKEY123'; // Your unique URL key

  if (key !== correctKey) {
    await Swal.fire({
      icon: 'error',
      title: '❌ Invalid access key!',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      position: 'center',
    });
    return router.createUrlTree(['/']); // redirect if key is wrong
  }

  // Prompt for password using SweetAlert2
  const { value: password } = await Swal.fire({
    title: '🔑 Enter Admin Password:',
    input: 'password',
    inputPlaceholder: 'Enter password',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    },
    allowOutsideClick: false,
    allowEscapeKey: false
  });

  const correctPassword = 'Admin@123';

  if (password === correctPassword) {
    return true; // allow access
  } else {
    await Swal.fire({
      icon: 'error',
      title: '❌ Wrong password!',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      position: 'center',
    });
    return router.createUrlTree(['/']); // redirect if password wrong
  }
};
