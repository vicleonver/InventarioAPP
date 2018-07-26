import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/* Integracion con Materialize CSS */
import { MaterializeModule } from 'angular2-materialize';

/* Importacion de Router */
import { AppRoutingModule } from './app-routing/app-routing.module';

/* Importacion de componentes */
import { AppComponent } from './app.component';
import { MenuNavegacionComponent } from './componentes/menu-navegacion/menu-navegacion.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ProductosComponent } from './componentes/tablas/productos/productos.component';
import { RubrosComponent } from './componentes/tablas/rubros/rubros.component';
import { ClientesComponent } from './componentes/tablas/clientes/clientes.component';
import { ProveedoresComponent } from './componentes/tablas/proveedores/proveedores.component';

/* Firestore */
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';

/* Servicios */
import { ClientesService } from './servicios/clientes.service';
import { FooterComponent } from './componentes/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuNavegacionComponent,
    InicioComponent,
    ProductosComponent,
    RubrosComponent,
    ClientesComponent,
    ProveedoresComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterializeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    ClientesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
