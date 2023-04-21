import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public auth: AuthService) {}

  async ngOnInit() {
    this.auth.user$.subscribe(async (user) => {
      console.log('User roles:', user?.['user_rol']);
    });

    const metadata = {
      roles: 'Admin',
      authorization: {
        groups: [],
        roles: ['Admin'],
        permissions: ['edit:roles'],
      },
    };
    // Ejemplo de uso: Se actualizan los roles del usuario con ID '123' para incluir el rol 'admin'.
    //await this.updateRolesForUser('auth0|64403e1cb8938d5926ca60bf', metadata);
  }

  // Esta función actualiza los metadatos de un usuario en Auth0 y le asigna los roles especificados.
  async updateRolesForUser(userId: string, roles: any) {
    try {
      const accessToken = this.auth.getAccessTokenSilently();
      if (accessToken) {
        console.log('se obtiene el token');
      }
      const updateMetadataResponse = await axios.patch(
        `https://dev-138fig3286kuaadw.us.auth0.com/api/v2/users/${userId}`,
        { app_metadata: { roles } },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // Se verifica que la actualización se haya realizado correctamente.
      if (updateMetadataResponse.status !== 200) {
        throw new Error('No se pudo actualizar los roles para el usuario');
      }
    } catch (error) {
      console.error(error);
      throw new Error('No se pudo actualizar los roles para el usuario');
    }
  }

  logOut() {
    this.auth.logout();
  }
}
