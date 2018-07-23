import { Component, OnInit, EventEmitter } from '@angular/core';
import { ClientesService } from '../../../servicios/clientes.service';
import {MaterializeAction} from 'angular2-materialize';
import { Clientes } from '../../../modelos/clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private servicio: ClientesService) { }
  modalActions = new EventEmitter<string|MaterializeAction>();
  modalActions2 = new EventEmitter<string|MaterializeAction>();
  agregarClienteModal = new EventEmitter<string|MaterializeAction>();


  listaClientes = [];

  registroCliente: Clientes = {
    id: '',
    nombre: '',
    direccion: '',
    telefono: '',
    cuit: ''
  }

  clienteId = '';
  clienteNombre = '';
  clienteDireccion = '';
  clienteTelefono = '';
  clienteCuit = '';

  ngOnInit() {
    this.servicio.obtenerClientesObservable().subscribe(datos => {
      this.listaClientes = datos;
    });

  }
  openModalEditar(id, nombre, direccion, telefono, cuit) {
    this.modalActions.emit({action: 'modal', params: ['open']});
    this.clienteId = id;
    this.clienteNombre = nombre;
    this.clienteDireccion = direccion;
    this.clienteTelefono = telefono;
    this.clienteCuit = cuit;

    console.log(this.clienteNombre);
    console.log('abre edicion')
  }
  guardarEdicion(id, nombre, direccion, telefono, cuit) {
    /* Armo registro a editar */
    this.registroCliente = {
      id: id,
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      cuit: cuit
    }
    this.servicio.modificarCliente(this.registroCliente);
    console.log(id, nombre);
    this.modalActions.emit({action: 'modal', params:['close']});
  }
  openModalEliminar(id, nombre) {
    this.clienteId = id;
    this.clienteNombre = nombre;

    this.modalActions2.emit({action: 'modal', params:['open']});
  }
  cancelarEliminar() {
    this.modalActions2.emit({action: 'modal', params: ['close']});
  }
  eliminarCliente(id) {
    console.log(id.value);
    this.modalActions2.emit({action: 'modal', params: ['close']});
    this.servicio.borrarCliente(id);
  }

  openModalAgregar(){
    this.agregarClienteModal.emit({action: 'modal', params:['open']});
  }
  agregarCliente(nombre, direccion, telefono, cuit) {
    console.log(nombre.value);
    console.log(direccion.value, telefono.value);
    console.log(cuit.value);.
    this.registroCliente = {
      nombre: nombre.value,
      direccion: direccion.value,
      telefono: telefono.value,
      cuit: cuit.value
    }
    console.log(this.registroCliente);
    this.servicio.agregarCliente(this.registroCliente);
    this.agregarClienteModal.emit({action: 'modal', params:['close']});
  }
  cancelarAgregar() {
    this.agregarClienteModal.emit({action: 'modal', params: ['close']});
  }
}
