import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { DataRx } from '../models/data-rx';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  dataRx: DataRx;
  private token: string;
  private userLogin: User;
  private sessionID: string;

  constructor() {
    this.token = null;
    this.userLogin = null;
  }

  decodeToken(token: string): boolean {
    const decoded = jwt_decode(token);
    if (decoded) {
      this.token = token || null;
      this.userLogin = decoded.data || null;
      this.sessionID = this.userLogin.sessionID || null;
      delete this.userLogin.sessionID;
      delete this.userLogin.password;
      return true;
    } else {
      return false;
    }
  }

  getToken(): string {
    return this.token;
  }

  destroyToken(): void {
    this.token = null;
  }

  getUserLogin(): object {
    return this.userLogin;
  }

  getSessionID(): string {
    return this.sessionID;
  }
}
