import { AuxiliarService } from './../../Services/auxiliar.service';
import { ServiceService } from './../../Services/service.service';
import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal'; // Importar el módulo de NzModalModule


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  standalone: true,
  imports:[NzModalModule],
})
export class ReservationComponent implements OnInit {
  constructor(
    private serviceService: ServiceService,
    private auxiliarService: AuxiliarService
  ) {}
  isVisible = false;
  isOkLoading = false;

  ngOnInit() {
    this.serviceService.GetAllServiceApiService().subscribe((res) => {
      console.log(res.succes);
      if (res.data.succes == true) {
      }
      this.auxiliarService.toastFuntion1(res.message, res.succes);
    });
  }



  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
