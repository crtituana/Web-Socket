import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PermissionsService } from './permissions.service';

@Injectable()
export class SocketJwtService extends Socket {
  constructor(private permissions: PermissionsService) {
    // const token = sessionStorage.getItem('token');
    super({
      url: 'https://localhost:3500',
      options: {
        // query: `token=${permissions.getToken()}&sessionID=${permissions.getSessionID()}`,
        query: `token=${sessionStorage.getItem('token')}`,
      },
    });
  }
}
