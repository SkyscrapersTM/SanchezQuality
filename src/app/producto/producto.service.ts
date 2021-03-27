import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusquedadProductoDTO } from '../model/BusquedadProductoDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoUrl = 'http://localhost:8080/';

  constructor(private httpCliente: HttpClient) { }

  marcas(): Observable<any[]>{
    return this.httpCliente.get<any[]>(this.productoUrl + 'marca/list');
  }

  productos(busquedadProducto: BusquedadProductoDTO): Observable<any[]>{
    return this.httpCliente.post<any[]>(this.productoUrl + 'producto/list', busquedadProducto);
  }
}
