import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Rubros } from '../modelos/rubros';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

  rubrosCol: AngularFirestoreCollection<Rubros>;
  rubrosDoc: AngularFirestoreDocument<Rubros>;
  rubrosObs: Observable<Rubros[]>;

  constructor(private afs: AngularFirestore) { }

  agregarRubro(rubData){
    this.afs.collection('rubros').add(rubData);
  }

  obtenerRubros(){
    this.afs.collection('rubros').snapshotChanges();
  }
  borrarRubro(id: string) {
    this.rubrosDoc = this.afs.doc(`rubros/${id}`);
    this.rubrosDoc.delete();
  }
  modificarRubro(rubro: Rubros) {
    this.rubrosDoc = this.afs.doc(`rubros/${rubro.id}`);
    this.rubrosDoc.update(rubro);
  }
  obtenerRubrosObservable() {
    this.rubrosObs = this.afs.collection('rubros').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Rubros;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.rubrosObs;
  }
}
