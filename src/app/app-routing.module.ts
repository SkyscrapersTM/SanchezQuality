import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductoDetalleComponent } from './producto/producto-detalle/producto-detalle.component';
import { ProductoEditarComponent } from './producto/producto-editar/producto-editar.component';
import { ProductoNuevoComponent } from './producto/producto-nuevo/producto-nuevo.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'producto/detail/:id', component: ProductoDetalleComponent },
  { path: 'producto/nuevo', component: ProductoNuevoComponent },
  { path: 'producto/editar/:id', component: ProductoEditarComponent },
  { path: '**', redirectTo: 'producto', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }