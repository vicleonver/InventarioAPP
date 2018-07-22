import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../componentes/inicio/inicio.component';
import { ProductosComponent } from '../componentes/tablas/productos/productos.component';
import { RubrosComponent } from '../componentes/tablas/rubros/rubros.component';
import { ClientesComponent } from '../componentes/tablas/clientes/clientes.component';
import { ProveedoresComponent } from '../componentes/tablas/proveedores/proveedores.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio',  component: InicioComponent },
  { path: 'tbl-productos', component: ProductosComponent },
  { path: 'tbl-rubros', component: RubrosComponent },
  { path: 'tbl-clientes', component: ClientesComponent },
  { path: 'tbl-proveedores', component: ProveedoresComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
