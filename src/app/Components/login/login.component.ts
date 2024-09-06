import { AuxiliarService } from './../../Services/auxiliar.service';
import { LoginService } from './../../Services/login.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  // imports:[FormControl, FormGroup, NonNullableFormBuilder, Validators]
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NgFor,
    NgIf,
    // other modules
  ],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private loginService: LoginService,
    private route: Router,
    private auxiliarService: AuxiliarService
  ) {}

  ngOnInit() {}
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const { userName, password } = this.validateForm.value;

      if (userName && password) {
        this.loginService.login(userName, password).subscribe(
          (response) => {
            console.log('Login successful', response);
            if (response.res.succes) {
              const token = response.token;

              if (token) {
                localStorage.setItem('token', token);
              }

              this.route.navigate(['reservations']);
            } else {
              this.auxiliarService.toastFuntionError(response.res.message);
            }
          },
          (error) => {
            console.error('Login error', error);
          }
        );
      } else {
        Object.values(this.validateForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
  }
}
