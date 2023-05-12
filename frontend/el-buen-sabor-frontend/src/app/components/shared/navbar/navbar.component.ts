import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  ruta: string = window.location.pathname

  constructor(public auth: AuthService, private spinner: NgxSpinnerService, private routes: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    this.auth.user$.subscribe(async (user) => {
      if (user) {
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  async login() {
    this.auth.loginWithRedirect();
  }

  logOut() {
    this.auth.logout();
  }
}
