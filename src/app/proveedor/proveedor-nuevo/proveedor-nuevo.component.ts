import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pais } from 'src/app/model/Pais';
import { Marca } from 'src/app/model/Marca';
import { Proveedor } from 'src/app/model/proveedor';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-proveedor-nuevo',
  templateUrl: './proveedor-nuevo.component.html',
  styleUrls: ['./proveedor-nuevo.component.css']
})
export class ProveedorNuevoComponent implements OnInit {
  dni:number = null;
  nombres:string = '';
  apellidos:string = '';
  razonSocial:string = '';
  direccion:string = '';
  celular:string = '';
  email:string = '';

  pais: Pais = null;
  paises: any[] = [];

  marca: Marca = null;
  marcas: any[] = [];

  constructor(
    private proveedorService: ProveedorService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.listaPaises();
    this.listaMarcas();
  }

  onCreate(): void {
    const proveedor = new Proveedor(this.dni, this.nombres, this.apellidos,
                                    this.razonSocial, this.direccion, this.celular,
                                    this.email, this.pais, this.marca);
    this.proveedorService.save(proveedor).subscribe(
      data => {
        this.toastr.success('Proveedor Creado.', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.router.navigate(['/proveedor']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al crear.', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.router.navigate(['/proveedor']);
    });
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
  
  volver(): void {
    this.router.navigate(['/proveedor']);
  } 
}