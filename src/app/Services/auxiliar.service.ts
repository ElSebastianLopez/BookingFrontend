import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarService {

constructor() { }

ventanaCargando() {
  Swal.fire({
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    imageUrl: '../../assets/img/loading.svg',
    customClass: {
      popup: 'bg-light bg-transparent',
    },
  });
}

toastFuntion(message: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: 'success',
    title: message,
  });
}
toastFuntionError(message: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: 'error',
    title: message,
  });
}
toastFuntionE(message: string, status: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  if (status == 'error') {
    Toast.fire({
      icon: 'error',
      title: message,
    });
  }
  if (status == 'success') {
    Toast.fire({
      icon: 'success',
      title: message,
    });
  }
}
toastFuntion1(message: string, status: boolean) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  if (status == false) {
    Toast.fire({
      icon: 'error',
      title: message,
    });
  }
  if (status == true) {
    Toast.fire({
      icon: 'success',
      title: message,
    });
  }
}

}
