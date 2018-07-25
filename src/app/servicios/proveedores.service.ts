import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Proveedores } from '../modelos/proveedores';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  proveedoresCol: AngularFirestoreCollection<Proveedores>;
  proveedoresDoc: AngularFirestoreDocument<Proveedores>;
  proveedoresObs: Observable<Proveedores[]>;

  constructor(private afs: AngularFirestore) { }

  agregarProveedor(provData){
    this.afs.collection('proveedores').add(provData);
  }

  obtenerProveedores(){
    this.afs.collection('clientes').snapshotChanges();
  }
  borrarProveedor(id: string) {
    console.log(id);
    this.proveedoresDoc = this.afs.doc(`proveedores/${id}`);

    this.proveedoresDoc.delete();
  }
  modificarProveedor(proveedor: Proveedores) {
    this.proveedoresDoc = this.afs.doc(`proveedores/${proveedor.id}`);
    this.proveedoresDoc.update(proveedor);
  }
  obtenerProveedoresObservable() {
    this.proveedoresObs = this.afs.collection('proveedores').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Proveedores;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.proveedoresObs;
  }
}
