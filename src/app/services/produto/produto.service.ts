import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  link = "http://192.168.0.105:8081/produtos"
  constructor(
    private http: HttpClient
  ) { }
  async getProdutos() {
    return await this.http.get(this.link).toPromise();
  }
}
