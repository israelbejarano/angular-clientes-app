import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo = 'Crear Cliente';
  errores: string[];

  constructor(private clienteService: ClienteService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe( (cliente: any) => this.cliente = cliente);
      }
    });
  }

  create() {
    this.clienteService.create(this.cliente)
      .subscribe((resp: any) => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente', `${resp.mensaje}: ${resp.cliente.nombre}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
      }
      );
  }

  update() {
    this.clienteService.update(this.cliente)
    .subscribe((resp: any) => {
      this.router.navigate(['/clientes']);
      swal.fire('Cliente Actualizado', `${resp.mensaje}: ${resp.cliente.nombre}`, 'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error(err.error.errors);
    }

    );
  }

}
