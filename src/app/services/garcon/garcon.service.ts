import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GarconService {
  link = "http://192.168.0.105:8081/garcon"
  constructor(
    private http: HttpClient
  ) { }

  async getGarcon() {
    return await this.http.get(this.link).toPromise();
  }
  async getGarconById(id) {
    return await this.http.get(this.link + "/" + id).toPromise();
  }
}
