import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule } from 'ngx-socket-io';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocketJwtService } from './services/socket-jwt.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DocsComponent } from './docs/docs.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, DocsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule,
  ],
  providers: [SocketJwtService],
  bootstrap: [AppComponent],
})
export class AppModule {}
