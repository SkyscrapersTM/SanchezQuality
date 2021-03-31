import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BusquedadProductoDTO } from '../model/BusquedadProductoDTO';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService
  ) { }

  marcas: any[] = [];
  productos: any[] = [];
  marcaElegida: any = null;
  busquedaDTO: BusquedadProductoDTO = {
    marca: '',
    descripcion: '',
    cantidadDesde: null,
    cantidadHasta: null,
    precioDesde: null,
    precioHasta: null,
    page: 0,
    size: 10,
    order: 'descripcion',
    asc: true
  };
  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: Array<number>;

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
        this.productos = data['content'];
        this.isFirst = data['first'];
        this.isLast = data['last'];
        this.totalPages = new Array(data['totalPages']);
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

  sort(): void {
    this.busquedaDTO.asc = !this.busquedaDTO.asc;
    this.listaProductos();
  }

  rewind(): void {
    if (!this.isFirst) {
      this.busquedaDTO.page--;
      this.listaProductos();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.busquedaDTO.page++;
      this.listaProductos();
    }
  }

  setPage(page: number): void {
    this.busquedaDTO.page = page;
    this.listaProductos();
  }

  borrar(id: number) {
    let elimina: boolean;
    elimina = confirm("¿Está seguro que desea eliminar?")
    if (elimina == true) {
      this.productoService.delete(id).subscribe(
        data => {
          this.toastr.success('Producto Eliminado!', 'OK', {
            timeOut: 3000,
            positionClass: 'toast-top-full-width'
          });
          this.listaProductos();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,
            positionClass: 'toast-top-full-width'
          });
        }
      );
    }
  }

}
