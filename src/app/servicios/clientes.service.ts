import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Clientes } from '../modelos/clientes';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientesCol: AngularFirestoreCollection<Clientes>;
  clientesDoc: AngularFirestoreDocument<Clientes>;
  clientesObs: Observable<Clientes[]>;

  constructor(private afs: AngularFirestore) { }

  agregarCliente(clidata){
    this.afs.collection('clientes').add(clidata);
  }

  obtenerClientes(){
    return this.afs.collection('clientes').snapshotChanges();
  }

  borrarCliente(cliente: Clientes){
    this.clientesDoc = this.afs.doc(`clientes/${cliente.id}`);
    this.clientesDoc.delete();
  }

  modificarCliente(cliente: Clientes){
    this.clientesDoc = this.afs.doc(`clientes/${cliente.id}`);
    this.clientesDoc.update(cliente);
  }

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
