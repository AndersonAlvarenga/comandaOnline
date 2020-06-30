import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comanda } from 'src/app/interfaces/comanda';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {
  link = "http://192.168.0.105:8081/comanda";
  constructor(
    private http: HttpClient
  ) { }
  async insert(comanda) {
    return await this.http.post(this.link, comanda).toPromise();
  }
  async getById(id) {
    return await this.http.get(this.link + "/" + id).toPromise();
  }
  async put(comanda: Comanda) {
    console.log("put")
    console.log(comanda)
    return await this.http.put(this.link + "/" + comanda.id, comanda).toPromise();
  }
}

