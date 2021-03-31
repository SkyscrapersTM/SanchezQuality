import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/model/Marca';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoNuevoComponent implements OnInit {

  descripcion:string = '';
  cantidad:number = null;
  precio:number = null;
  marca: Marca = null;
  marcas: any[] = [];

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.listaMarcas();
  }

  onCreate(): void {
    const producto = new Producto(this.descripcion, this.cantidad, this.precio, this.marca);
    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success('Producto Creado!', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.router.navigate(['/producto']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.router.navigate(['/producto']);
    });
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
  volver(): void {
    this.router.navigate(['/producto']);
  }
  
}
