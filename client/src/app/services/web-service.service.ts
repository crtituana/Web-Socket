import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { PermissionsService } from './permissions.service';

@Injectable({
  providedIn: 'root',
})
export class WebServiceService {
  private url: string;

  constructor(private permissions: PermissionsService) {
    this.url = 'https://localhost:3500/api/';
  }

  getUrl(): string {
    return this.url;
  }

  getHeaders(): object {
    const optionsHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.permissions.getToken(),
      }),
    };
    return optionsHeaders;
  }

  getHeaderFile(): object {
    const optionsHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Authorization: this.permissions.getToken(),
      }),
    };
    return optionsHeaders;
  }
}
