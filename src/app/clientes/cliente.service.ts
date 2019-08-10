import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes() {
    return this.http.get(this.urlEndPoint).pipe(map((resp: Cliente[]) => {
      const clientes = resp;
      return clientes.map(cliente => {
        const datePipe = new DatePipe('es');
        cliente.createAt = datePipe.transform(cliente.createAt, 'dd-MM-yyyy');
        return cliente;
      });
    }));
  }

  getCliente(id: number) {
    const url = this.urlEndPoint + '/' + id.toString();
    return this.http.get<Cliente>(url).pipe(map((resp: Cliente) => {
      return resp;
    }), catchError(e => {
      this.router.navigate(['/clientes']);
      console.error(e.error.mensaje);
      swal.fire('Error al editar', e.error.mensaje, 'error');
      return throwError(e);
    }));
  }

  create(cliente: Cliente) {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
        map((resp: Cliente) => {
          return resp;
    }), catchError(e => {
      if (e.status === 400) {
        return throwError(e);
      }
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    }));
  }


  update(cliente: Cliente) {
    const url = this.urlEndPoint + '/' + cliente.id.toString();
    return this.http.put(url, cliente, {headers: this.httpHeaders}).pipe(map((resp: Cliente) => {
      return resp;
    }), catchError(e => {
      if (e.status === 400) {
        return throwError(e);
      }
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    }));
  }

  delete(id: number) {
    const url = this.urlEndPoint + '/' + id.toString();
    return this.http.delete(url, {headers: this.httpHeaders}).pipe(map((resp: any) => {
      return true;
    }), catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    }));
  }

}
