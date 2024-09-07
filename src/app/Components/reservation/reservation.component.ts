import { ReservationService } from './../../Services/reservation.service';
import { NzDropDownDirective } from 'ng-zorro-antd/dropdown';
import { AuxiliarService } from './../../Services/auxiliar.service';
import { ServiceService } from './../../Services/service.service';
import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { getISOWeek } from 'date-fns';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  standalone: true,
  imports: [
    NzModalModule,
    NzTableModule,
    NzBadgeModule,
    NgFor,
    NgIf,
    NzDividerModule,
    NzDropDownModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzCheckboxModule,
    FormsModule,
    NzDatePickerModule,
    CurrencyPipe,
  ],
})
export class ReservationComponent implements OnInit {
  reservation:
    | {
        Id: 0; // O el valor que necesites
        Name: '';
        IdCustomer: 0; // O el valor que necesites
        ReservationStartDate: '';
        ReservationEndDate: '';
        ReservationDate: '';
        TotalReserveCost: '';
        Details: {
          Id: 0; // O el valor que necesites
          IdService: 0;
          IdReservation: 0; // O el valor que necesites
          ServiceCost: 0;
        }[];
      }
    | any;
  constructor(
    private serviceService: ServiceService,
    private auxiliarService: AuxiliarService,
    private reservationService: ReservationService
  ) {}
  services: any;
  reservations: any;
  selectedservices: { [key: number]: { id: number; cost: number } } = {};
  isVisible = false;
  isOkLoading = false;
  listOfParentData: ParentItemData[] = [];
  listOfChildrenData: ReservationDetailDTO[] = [];
  size: NzButtonSize = 'large';
  checked = true;
  date: Date[] | null = null;
  isEdit = false;

  initReservation() {
    this.reservation = {
      Id: 1,
      Name: '',
      IdCustomer: 0,
      ReservationStartDate: '',
      ReservationEndDate: '',
      ReservationDate: '',
      TotalReserveCost: '',
      Details: [],
    };
  }

  ngOnInit() {
    this.initReservation();
    this.GetAllServices();
    this.GetAllReservation();
  }

  GetAllServices() {
    this.serviceService.GetAllServiceApiService().subscribe((res) => {
      console.log(res.succes);
      if (res.succes == true) {
        this.services = res.data;
      }
      console.log(this.services);
    });
  }

  GetAllReservation() {
    this.reservationService
      .GetAllReservationByIdCustomerApiService()
      .subscribe((reservation) => {
        // Mapea la respuesta de la API para adaptarla al formato de la tabla
        this.listOfParentData = reservation.data.map((res: any) => ({
          id: res.id,
          name: res.name,
          reservationStartDate: res.reservationStartDate,
          reservationEndDate: res.reservationEndDate,
          totalReserveCost: res.totalReserveCost || 'N/A',
          reservationDate: res.reservationDate,
          status: res.status,
          expand: false,
          details: res.details.map((detail: any) => ({
            id: detail.id,
            idService: detail.idService,
            service: detail.service,
            serviceCost: detail.serviceCost,
          })),
        }));

        // Imprimir para verificar que los datos se han asignado correctamente
        console.log('GetAllReservation', this.listOfParentData);
      });
  }

  GetReservationById(id: number) {
    this.reservationService
      .GetByIdReservationApiService(id)
      .subscribe((res) => {
        if (res.succes == true) {
          const data = res.data;

          this.reservation.Id = id;
          this.selectedservices = {};

          // Marcar los servicios seleccionados
          data.details.forEach((detail: any) => {
            this.selectedservices[detail.idService] = {
              id: detail.idService,
              cost: detail.serviceCost,
            };
          });

          // Asignar las fechas de inicio y fin solo si ambas están presentes
          if (data.reservationStartDate && data.reservationEndDate) {
            this.date = [
              new Date(data.reservationStartDate),
              new Date(data.reservationEndDate),
            ];
          } else {
            this.date = null; // O manejar un valor por defecto
          }
        }
      });
  }

  CreateReservation() {
    this.ReviwUpdateReservation();
    this.reservationService
      .CreateReservationApiservice(this.reservation)
      .subscribe((reservation) => {
        console.log(' create ', reservation);
        if (reservation.succes == true) {
          this.GetAllReservation();
          this.Clean();
        }
        this.auxiliarService.toastFuntion1(
          reservation.message,
          reservation.succes
        );
      });
  }

  Editreservation() {
    this.reservationService
      .EditReservationApiservice(this.reservation)
      .subscribe((reservation) => {
        if (reservation.succes == true) {
          this.GetAllReservation();
          this.Clean();
        }
        this.auxiliarService.toastFuntion1(
          reservation.message,
          reservation.succes
        );
      });
  }

  DeleteReservation(id: number) {
    Swal.fire({
      title: 'Estas seguro de eliminar este registro?',
      text: 'No podra revertir esta accion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6 ',
      confirmButtonText: 'Si, Eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService
          .DeleteReservationApiservice(id)
          .subscribe((res: any) => {
            if (res.succes == true) {
              this.GetAllReservation();
            }
            this.auxiliarService.toastFuntion(res.message);
          });
      }
    });
  }

  CancelReservation(id: number) {
    Swal.fire({
      title: 'Estas seguro de Cancelar este registro?',
      text: 'No podra revertir esta accion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6 ',
      confirmButtonText: 'Si, Cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService
          .CancelReservationApiService(id)
          .subscribe((res: any) => {
            if (res.succes == true) {
              this.GetAllReservation();
            }
            this.auxiliarService.toastFuntion(res.message);
          });
      }
    });
  }

  BuyReservation(id: number) {
    Swal.fire({
      title: 'Estas seguro de pagar este registro?',
      text: 'No podra revertir esta accion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0505',
      cancelButtonColor: '#3085d6 ',
      confirmButtonText: 'Si, pagar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.BuyReservation(id).subscribe((res: any) => {
          if (res.succes == true) {
            this.GetAllReservation();
          }
          this.auxiliarService.toastFuntion(res.message);
        });
      }
    });
  }

  onCheckboxChange(
    serviceId: number,
    isChecked: boolean,
    servicePrice: number
  ) {
    if (isChecked) {
      this.selectedservices[serviceId] = { id: serviceId, cost: servicePrice };
    } else {
      delete this.selectedservices[serviceId];
    }
    this.ReviwUpdateReservation();
  }

  showModal(): void {
    this.Clean();
    this.isVisible = true;
  }
  showModalEdit(id: any): void {
    this.Clean();
    this.GetReservationById(id);
    this.isVisible = true;
    this.isEdit = true;
  }

  handleOk(): void {
    this.isOkLoading = true;

    if (this.isEdit) {
      this.Editreservation();
    } else {
      this.CreateReservation(); // Llamada a la función de crear
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }
  ReviwUpdateReservation() {
    this.reservation = {
      Id: this.reservation.Id, // O el valor que necesites
      Name: '',
      IdCustomer: null, // O el valor que necesites
      ReservationStartDate: this.date
        ? this.formatForDotNet(this.date[0])
        : null,
      ReservationEndDate: this.date ? this.formatForDotNet(this.date[1]) : null,
      ReservationDate: this.formatForDotNet(new Date()),
      TotalReserveCost: '',
      Details: Object.values(this.selectedservices).map((service) => ({
        Id: null, // O el valor que necesites
        IdService: service.id,
        IdReservation: null, // O el valor que necesites
        ServiceCost: service.cost,
      })),
    };
    console.log('Servicios seleccionado', this.reservation);
  }

  formatForDotNet(date: Date): string {
    if (!date) return '';

    // Formatea el objeto Date en 'YYYY-MM-DDTHH:mm:ss'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses en JavaScript van de 0 a 11
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Devuelve el formato 'YYYY-MM-DDTHH:mm:ss'
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  Clean() {
    this.reservation.Id = 0;
    this.selectedservices = {};

    // Ponemos isEdit en false después de crear la reserva
    this.isEdit = false;
    this.isVisible = false;
    this.isOkLoading = false;
  }
}

interface ParentItemData {
  id: number;
  name: string;
  reservationStartDate: string;
  reservationEndDate: string;
  totalReserveCost: string | null;
  reservationDate: string;
  status: string;
  expand: boolean;
  details: ReservationDetailDTO[];
}

interface ReservationDetailDTO {
  id: number;
  idService: number;
  service: string;
  serviceCost: number;
}
