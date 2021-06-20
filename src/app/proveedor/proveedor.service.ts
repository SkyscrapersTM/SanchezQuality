import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusquedaProveedorDTO } from '../model/BusquedaProveedorDTO';
import { Proveedor } from '../model/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  proveedorUrl = 'http://localhost:8080/';

  constructor(private httpCliente: HttpClient) { }

  public paises(): Observable<any[]> {
    return this.httpCliente.get<any[]>(this.proveedorUrl + 'pais/list');
  }

  public marcas(): Observable<any[]> {
    return this.httpCliente.get<any[]>(this.proveedorUrl + 'marca/list');
  }

  public proveedores(busquedaProveedor: BusquedaProveedorDTO): Observable<any[]> {
    return this.httpCliente.post<any[]>(this.proveedorUrl + 'proveedor/list', busquedaProveedor);
  }

  public detail(id: number): Observable<Proveedor> {
    return this.httpCliente.get<Proveedor>(this.proveedorUrl + `proveedor/detail/${id}`);
  }

  public detailRazonSocial(razonSocial: string): Observable<Proveedor> {
    return this.httpCliente.get<Proveedor>(this.proveedorUrl + `proveedor/detailRazonSocial/${razonSocial}`);
  }

  public save(proveedor: Proveedor): Observable<any> {
    return this.httpCliente.post<any>(this.proveedorUrl + 'proveedor/create', proveedor);
  }

  public update(id:number, proveedor: Proveedor): Observable<any> {
    return this.httpCliente.put<any>(this.proveedorUrl + `proveedor/update/${id}`, proveedor);
  }

  public delete(id:number): Observable<any> {
    return this.httpCliente.delete<any>(this.proveedorUrl + `proveedor/delete/${id}`);
  }
}