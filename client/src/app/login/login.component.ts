import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { DataRx } from '../models/data-rx';
import { LoginService } from '../services/login.service';
import { PermissionsService } from '../services/permissions.service';

export interface DataLogin {
  data: {
    email: string;
    password: string;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  dataLogin: DataLogin;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private permissions: PermissionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._loginForm();
 
  }

  _loginForm = () => {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  };

  login(): void {
    this.dataLogin = {
      data: {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      },
    };

    this.loginService.logIn(this.dataLogin).subscribe(
      (res: DataRx) => {
        if (res.ok) {
          if (this.permissions.decodeToken(res.token)) {
            sessionStorage.setItem('token', this.permissions.getToken());
            this.router.navigate(['/home']);
            console.log(this.permissions.getUserLogin());
          }
        } else {
          this.dataLogin.data.email = '';
          this.dataLogin.data.password = '';
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: res.msg,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
