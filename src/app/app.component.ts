import { Component,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';      // Para <nz-layout>, <nz-header>, <nz-content>, <nz-footer>
import { NzMenuModule } from 'ng-zorro-antd/menu';          // Para <ul nz-menu> y <li nz-menu-item>
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';  // Para <nz-breadcrumb> y <nz-breadcrumb-item>


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule  
  ],
  schemas: []
})
export class AppComponent {
  title = 'BookingFront';
}
