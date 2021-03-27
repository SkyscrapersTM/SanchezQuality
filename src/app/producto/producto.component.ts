import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BusquedadProductoDTO } from '../model/BusquedadProductoDTO';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private productoService: ProductoService) { }

  marcas: any[] = [];
  productos: any[] = [];
  marcaElegida: any = null;
  busquedaDTO: BusquedadProductoDTO = {
    marca: '',
    descripcion: '',
    cantidadDesde: null,
    cantidadHasta: null,
    precioDesde: null,
    precioHasta: null
  };

  ngOnInit(): void {
    this.listaMarcas();
    this.listaProductos();
  }

  listaMarcas(): void {
    this.productoService.marcas().subscribe(
      data => {
        this.marcas = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  listaProductos(): void {
    this.productoService.productos(this.busquedaDTO).subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  onChangeMarca(): void {
    if (this.marcaElegida) {
      this.busquedaDTO.marca = this.marcaElegida.nombre;
    } else {
      this.busquedaDTO.marca = '';
    }
    this.listaProductos();
  }

  clearDescripcion(): void {
    this.busquedaDTO.descripcion = '';
    this.listaProductos();
  }

  clearStockDesde(): void {
    this.busquedaDTO.cantidadDesde = null;
    this.listaProductos();
  }
  clearStockHasta(): void {
    this.busquedaDTO.cantidadHasta = null;
    this.listaProductos();
  }

  clearPrecioDesde(): void {
    this.busquedaDTO.precioDesde = null;
    this.listaProductos();
  }
  
  clearPrecioHasta(): void {
    this.busquedaDTO.precioHasta = null;
    this.listaProductos();
  }

  clear(): void {
    this.marcaElegida = null;
    this.busquedaDTO.marca = '';
    this.busquedaDTO.descripcion = '',
    this.busquedaDTO.cantidadDesde = null,
    this.busquedaDTO.cantidadHasta = null,
    this.busquedaDTO.precioDesde = null,
    this.busquedaDTO.precioHasta = null
    this.listaProductos();
  }
}
