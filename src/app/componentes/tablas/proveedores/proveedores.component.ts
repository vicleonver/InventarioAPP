import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import { ProveedoresService } from '../../../servicios/proveedores.service';
import { Proveedores } from '../../../modelos/proveedores';
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  constructor(private servicio: ProveedoresService) { }
  editarProveedorModal = new EventEmitter<string|MaterializeAction>();
  eliminarProveedorModal = new EventEmitter<string|MaterializeAction>();
  agregarProveedorModal = new EventEmitter<string|MaterializeAction>();

  listaProveedores = [];

  registroProveedor: Proveedores = {
    id: '',
    nombre: '',
    direccion: '',
    telefono: '',
    cuit: ''
  }

  proveedorId = '';
  proveedorNombre = '';
  proveedorDireccion = '';
  proveedorTelefono = '';
  proveedorCuit = '';

  ngOnInit() {
    this.servicio.obtenerProveedoresObservable().subscribe(datos => {
      this.listaProveedores = datos;
    })
  }

  openModalEditar(id, nombre, direccion, telefono, cuit) {
    this.editarProveedorModal.emit({action: 'modal', params: ['open']});
    this.proveedorId = id;
    this.proveedorNombre = nombre;
    this.proveedorDireccion = direccion;
    this.proveedorTelefono = telefono;
    this.proveedorCuit = cuit;
  }
  cancelarEditar(){
    this.editarProveedorModal.emit({action: 'modal', params: ['close']});
  }
  guardarEdicion(id, nombre, direccion, telefono, cuit){
    this.registroProveedor = {
      id: id,
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      cuit: cuit
    };
    console.log(id);
    this.servicio.modificarProveedor(this.registroProveedor);
    this.editarProveedorModal.emit({action: 'modal', params: ['close']});
  }
  openModalEliminar(id, nombre) {
    this.proveedorId = id;
    this.proveedorNombre = nombre;
    this.eliminarProveedorModal.emit({action: 'modal', params: ['open']});
  }
  cancelarEliminar(){
    this.eliminarProveedorModal.emit({action: 'modal', params: ['close']});
  }
  eliminarProveedor(id){
    this.eliminarProveedorModal.emit({action: 'modal', params: ['close']});
    this.servicio.borrarProveedor(id.value);
  }
  openModalAgregar(){
    this.agregarProveedorModal.emit({action: 'modal', params: ['open']});
  }
  agregarProveedor(nombre, direccion, telefono, cuit){
    this.registroProveedor = {
      nombre: nombre.value,
      direccion: direccion.value,
      telefono: telefono.value,
      cuit: cuit.value
    };
    this.servicio.agregarProveedor(this.registroProveedor);
    this.agregarProveedorModal.emit({action: 'modal', params:['close']});
  }
  cancelarAgregar(){
    this.agregarProveedorModal.emit({action: 'modal', params: ['close']});
  }
}
