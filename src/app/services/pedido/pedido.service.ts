import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  link = "http://192.168.0.105:8081/pedido"
  constructor(
    private http: HttpClient
  ) { }

  async insert(pedido) {
    this.http.post(this.link, pedido).toPromise();
  }
}
