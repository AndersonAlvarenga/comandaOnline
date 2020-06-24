import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  link = "http://192.168.0.105:8081/categorias"
  constructor(
    private http: HttpClient
  ) { }
  async getCategoria() {
    return await this.http.get(this.link).toPromise();
  }
  async getCategoriaById(id) {
    return await this.http.get(this.link + "/" + id).toPromise();
  }
}
