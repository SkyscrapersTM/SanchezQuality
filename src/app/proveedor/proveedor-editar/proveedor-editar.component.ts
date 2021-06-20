import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/model/proveedor';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-proveedor-editar',
  templateUrl: './proveedor-editar.component.html',
  styleUrls: ['./proveedor-editar.component.css']
})
export class ProveedorEditarComponent implements OnInit {

  proveedor: Proveedor = null;
  paises: any[] = [];
  marcas: any[] = [];

  constructor(
    private proveedorService: ProveedorService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.proveedorService.detail(id).subscribe(
      data => {
        this.proveedor = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
      }
    );
    this.listaPaises();
    this.listaMarcas();
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.proveedorService.update(id, this.proveedor).subscribe(
      data => {
        this.toastr.success('Proveedor Actualizado.', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.router.navigate(['/proveedor']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al actualizar.', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.router.navigate(['/proveedor']);
      }
    );
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