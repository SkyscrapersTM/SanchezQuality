import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BusquedaProveedorDTO } from '../model/BusquedaProveedorDTO';
import { ProveedorService } from './proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  constructor(
    private proveedorService: ProveedorService,
    private toastr: ToastrService
  ) { }

  paises: any[] = [];
  marcas: any[] = [];
  proveedores: any[] = [];
  paisElegida: any = null;
  marcaElegida: any = null;
  busquedaDTO: BusquedaProveedorDTO = {
    pais: '',
    marca: '',
    dni: null,
    nombres: '',
    apellidos: '',
    razonSocial: '',
    direccion: '',
    celular: '',
    email: '',
    page: 0,
    size: 10,
    order: 'razonSocial',
    asc: true
  };
  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: Array<number>;

  ngOnInit(): void {
    this.listaPaises();
    this.listaMarcas();
    this.listaProveedores();
  }

  listaPaises(): void {
    this.proveedorService.paises().subscribe(
      data => {
        this.paises = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  listaMarcas(): void {
    this.proveedorService.marcas().subscribe(
      data => {
        this.marcas = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  listaProveedores(): void {
    this.proveedorService.proveedores(this.busquedaDTO).subscribe(
      data => {
        this.proveedores = data['content'];
        this.isFirst = data['first'];
        this.isLast = data['last'];
        this.totalPages = new Array(data['totalPages']);
      },
      err => {
        console.log(err);
      }
    );
  }

  onChangePais(): void {
    if (this.paisElegida) {
      this.busquedaDTO.pais = this.paisElegida.nombre;
    } else {
      this.busquedaDTO.pais = '';
    }
    this.listaProveedores();
  }

  onChangeMarca(): void {
    if (this.marcaElegida) {
      this.busquedaDTO.marca = this.marcaElegida.nombre;
    } else {
      this.busquedaDTO.marca = '';
    }
    this.listaProveedores();
  }

  clearRazonSocial(): void {
    this.busquedaDTO.razonSocial = '';
    this.listaProveedores();
  }

  clear(): void {
    this.paisElegida = null;
    this.marcaElegida = null;
    this.busquedaDTO.pais = '';
    this.busquedaDTO.marca = '';
    this.busquedaDTO.razonSocial = '',
    this.listaProveedores();
  }

  sort(): void {
    this.busquedaDTO.asc = !this.busquedaDTO.asc;
    this.listaProveedores();
  }

  rewind(): void {
    if (!this.isFirst) {
      this.busquedaDTO.page--;
      this.listaProveedores();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.busquedaDTO.page++;
      this.listaProveedores();
    }
  }

  setPage(page: number): void {
    this.busquedaDTO.page = page;
    this.listaProveedores();
  }

  borrar(id: number) {
    let elimina: boolean;
    elimina = confirm("¿Está seguro que desea eliminar?")
    if (elimina == true) {
      this.proveedorService.delete(id).subscribe(
        data => {
          this.toastr.success('Proveedor Eliminado.', 'OK', {
            timeOut: 3000,
            positionClass: 'toast-top-full-width'
          });
          this.listaProveedores();
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