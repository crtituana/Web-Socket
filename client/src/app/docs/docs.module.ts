import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DocsRoutingModule } from './docs-routing.module';
import { DocComponent } from './doc/doc.component';
import { DocsListComponent } from './docs-list/docs-list.component';

import { SocketIoModule } from 'ngx-socket-io';
import { SocketJwtService } from '../services/socket-jwt.service';

@NgModule({
  declarations: [DocComponent, DocsListComponent],
  imports: [CommonModule, DocsRoutingModule, FormsModule, SocketIoModule],
  providers: [SocketJwtService],
})
export class DocsModule {}
