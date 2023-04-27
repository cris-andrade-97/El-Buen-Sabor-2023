import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Client } from '@auth0/auth0-spa-js';
import axios from 'axios';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.auth.loginWithRedirect();
  }

  // async addRolesToUser(userId: string, roles: string) {
  //   try {
  //     const response = await axios.post(
  //       `https://dev-138fig3286kuaadw.us.auth0.com/api/v2/users/${userId}/roles`,
  //       { roles },
  //       {
  //         headers: {
  //           'content-type': 'application/json',
  //           authorization:
  //             'Bearer TOKEN_ID',
  //           'cache-control': 'no-cache',
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('No se pudieron agregar los roles al usuario');
  //   }
  // }
}
