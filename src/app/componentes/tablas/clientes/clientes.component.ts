import { Component, OnInit, EventEmitter } from '@angular/core';
import { ClientesService } from '../../../servicios/clientes.service';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private servicio: ClientesService) { }
  modalActions = new EventEmitter<string|MaterializeAction>();
  listaClientes = [];

  ngOnInit() {
    this.servicio.obtenerClientesObservable().subscribe(datos => {
      this.listaClientes = datos;
    });

  }
  openModal() {
    this.modalActions.emit({action: 'modal', params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action: 'modal', params:['close']});
  }
}
