import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/usuario';
import { NgControlStatus } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  link = "http://192.168.0.105:8081/usuario";
  constructor(
    private http: HttpClient
  ) { }

  async inserUser(user) {
    return await this.http.post(this.link, user).toPromise();
  }
  async getUserByEmail(email) {
    let aux: any;
    let listaUser: Usuario[];
    aux = await this.http.get(this.link).toPromise();
    listaUser = aux;
    let id: number;
    listaUser.forEach((user) => {
      if (user.email == email) {
        id = user.id
      }
    })
    return id;
  }
  async getUserByID(id) {
    return await this.http.get(this.link + "/" + id).toPromise();
  }
  async put(user: Usuario) {
    return this.http.put(this.link + "/" + user.id, user).toPromise();
  }


}

