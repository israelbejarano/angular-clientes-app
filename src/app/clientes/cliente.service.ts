import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get(this.urlEndPoint).pipe(map((resp: Cliente[]) => {
      return resp;
    }));
  }

  getCliente(id: number) {
    const url = this.urlEndPoint + '/' + id.toString();
    return this.http.get<Cliente>(url).pipe(map((resp: Cliente) => {
      return resp;
    }));
  }

  create(cliente: Cliente) {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(map((resp: Cliente) => {
      return resp;
    }));
  }


  update(cliente: Cliente) {
    const url = this.urlEndPoint + '/' + cliente.id.toString();
    return this.http.put(url, cliente, {headers: this.httpHeaders}).pipe(map((resp: Cliente) => {
      return resp;
    }));
  }

  delete(id: number) {
    const url = this.urlEndPoint + '/' + id.toString();
    return this.http.delete(url, {headers: this.httpHeaders}).pipe(map((resp: any) => {
      return true;
    }));
  }

}
