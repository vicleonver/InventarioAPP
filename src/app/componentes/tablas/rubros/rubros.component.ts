import { Component, OnInit, EventEmitter } from '@angular/core';
import { RubrosService } from '../../../servicios/rubros.service';
import {MaterializeAction} from 'angular2-materialize';
import { Rubros } from '../../../modelos/rubros';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.css']
})
export class RubrosComponent implements OnInit {

  constructor(private servicio: RubrosService) { }

  editarRubroModal = new EventEmitter<string|MaterializeAction>();
  eliminarRubroModal = new EventEmitter<string|MaterializeAction>();
  agregarRubroModal = new EventEmitter<string|MaterializeAction>();

  listaRubros = [];

  registroRubro: Rubros = {
    id: '',
    nombre: ''
  };

  rubroId = '';
  rubroNombre = '';

  ngOnInit() {
    this.servicio.obtenerRubrosObservable().subscribe(datos => {
      this.listaRubros = datos;
    });
  }

  openModalEditar(id,nombre) {
    this.editarRubroModal.emit({action: 'modal', params: ['open']});
    this.rubroId = id;
    this.rubroNombre = nombre;
  }
  cancelarEditar(){
    this.editarRubroModal.emit({action: 'modal', params: ['close']});
  }
  guardarEdicion(id, nombre) {
    this.registroRubro = {
      id: id,
      nombre: nombre
    }
    this.servicio.modificarRubro(this.registroRubro);
    this.editarRubroModal.emit({action: 'modal', params: ['close']});
  }
  openModalEliminar(id, nombre) {
    this.rubroId = id;
    this.rubroNombre = nombre;
    this.eliminarRubroModal.emit({action: 'modal', params: ['open']});
  }
  cancelarEliminar(){
    this.eliminarRubroModal.emit({action: 'modal', params: ['close']});
  }
  eliminarRubro(id){
    this.servicio.borrarRubro(id.value);
    this.eliminarRubroModal.emit({action: 'modal', params: ['close']});
  }
  openModalAgregar(){
    this.rubroNombre = '';
    this.agregarRubroModal.emit({action: 'modal', params: ['open']});
  }
  agregarRubro(nombre){
    this.registroRubro = {
      nombre: nombre.value
    };
    this.servicio.agregarRubro(this.registroRubro);
    this.agregarRubroModal.emit({action: 'modal', params: ['close']});
  }
  cancelarAgregar(){
    this.agregarRubroModal.emit({action: 'modal', params: ['close']});
  }
}
