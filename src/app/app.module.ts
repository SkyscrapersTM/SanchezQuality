import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductoComponent } from './producto/producto.component';
import { NavbarComponent } from './navbar/navbar.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { ProductoDetalleComponent } from './producto/producto-detalle/producto-detalle.component';
import { ProductoNuevoComponent } from './producto/producto-nuevo/producto-nuevo.component';
import { ProductoEditarComponent } from './producto/producto-editar/producto-editar.component';

//External
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegistroComponent,
    ProductoComponent,
    NavbarComponent,
    ProductoDetalleComponent,
    ProductoNuevoComponent,
    ProductoEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
