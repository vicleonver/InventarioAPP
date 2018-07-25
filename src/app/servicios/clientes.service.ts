import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Clientes } from '../modelos/clientes';
@Injectable({
  providedIn: 'root'
})

/* En esta clase se encuentran los procedimientos para efectuar operaciones sobre
   los datos contenidos en la coleccion de documentos Clientes.
   Si no encuentra la coleccion Firestore la crea automaticamente.
*/
export class ClientesService {

  clientesCol: AngularFirestoreCollection<Clientes>;
  clientesDoc: AngularFirestoreDocument<Clientes>;
  clientesObs: Observable<Clientes[]>;

  constructor(private afs: AngularFirestore) { }
  /* Agrega Clientes a la base de datos */
  agregarCliente(clidata){
    this.afs.collection('clientes').add(clidata);
  }
  /* Obtiene los clientes de la coleccion firestore */
  obtenerClientes(){
    return this.afs.collection('clientes').snapshotChanges();
  }
  /* Elimina un cliente con el id pasado como parametro */
  borrarCliente(id: string){
    this.clientesDoc = this.afs.doc(`clientes/${id}`);
    this.clientesDoc.delete();
  }
  /* Modifica un cliente */
  modificarCliente(cliente: Clientes){
    this.clientesDoc = this.afs.doc(`clientes/${cliente.id}`);
    this.clientesDoc.update(cliente);
  }
  /* Obtiene los clientes y los envia a un observable para desplegar en una table */
  obtenerClientesObservable(){
    this.clientesObs = this.afs.collection('clientes').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Clientes;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.clientesObs;
  }

}
