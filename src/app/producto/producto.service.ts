import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusquedadProductoDTO } from '../model/BusquedadProductoDTO';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoUrl = 'http://localhost:8080/';

  constructor(private httpCliente: HttpClient) { }

  public marcas(): Observable<any[]> {
    return this.httpCliente.get<any[]>(this.productoUrl + 'marca/list');
  }

  public productos(busquedadProducto: BusquedadProductoDTO): Observable<any[]> {
    return this.httpCliente.post<any[]>(this.productoUrl + 'producto/list', busquedadProducto);
  }

  public detail(id: number): Observable<Producto> {
    return this.httpCliente.get<Producto>(this.productoUrl + `producto/detail/${id}`);
  }

  public detailDescripcion(descripcion: string): Observable<Producto> {
    return this.httpCliente.get<Producto>(this.productoUrl + `producto/detaildescripcion/${descripcion}`);
  }

  public save(producto: Producto): Observable<any> {
    return this.httpCliente.post<any>(this.productoUrl + 'producto/create', producto);
  }

  public update(id:number, producto: Producto): Observable<any> {
    return this.httpCliente.put<any>(this.productoUrl + `producto/update/${id}`, producto);
  }

  public delete(id:number): Observable<any> {
    return this.httpCliente.delete<any>(this.productoUrl + `producto/delete/${id}`);
  }
}
