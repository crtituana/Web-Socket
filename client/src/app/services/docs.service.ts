import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { Docs } from '../models/docs';
import { SocketJwtService } from './socket-jwt.service';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  currentDoc = this.socket.fromEvent<Docs>('manageData');
  docs = this.socket.fromEvent<string[]>('getData');

  constructor(private socket: SocketJwtService) {}

  getDoc(id: string) {
    this.socket.emit('getDoc', id);
  }

  addDoc(doc) {
    if (this.socket.ioSocket.connected) {
      this.socket.emit('addDoc', doc);
    } else {
      alert('Token Invalido');
    }
  }

  editDoc(doc: Docs) {
    this.socket.emit('editDoc', doc);
  }

}
