import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  link = "http://192.168.0.105:8081/mesa"
  constructor(
    private http: HttpClient
  ) { }
  async getMesa() {
    return await this.http.get(this.link).toPromise();
  }
  async getMesaById(id) {
    return await this.http.get(this.link + "/" + id).toPromise();
  }
  async mesaPut(obj) {
    this.http.put(this.link + "/" + obj.id, obj).toPromise();
  }
}
