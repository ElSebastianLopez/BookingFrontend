import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  login = false;
  title = 'BookingFront';
  ngOnInit(): void {
    if (localStorage !== null) {
      this.login = true;
    }
  }

  constructor(private router: Router) {}
  closeSeccion() {
    this.login = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
