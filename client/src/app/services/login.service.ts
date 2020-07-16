import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web-service.service';
import { PermissionsService } from './permissions.service';
import { DataRx } from '../models/data-rx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: string;

  constructor(
    private http: HttpClient,
    private server: WebServiceService,
    private permissions: PermissionsService
  ) {
    this.url = server.getUrl();
  }

  logIn(dataLogin): Observable<DataRx> {
    return this.http.post<DataRx>(`${this.url}login`, dataLogin);
  }
}
