import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      
      console.log('User roles:', user?.['user_rol']);
    });
  }

  logOut() {
    this.auth.logout();
  }
}
