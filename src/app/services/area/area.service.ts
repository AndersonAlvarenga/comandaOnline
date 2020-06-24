import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
link="http://192.168.0.105:8081/area"
  constructor(
    private http:HttpClient
  ) { }

  async getArea(){
    return await this.http.get(this.link).toPromise();
  }
  async getAreaById(id){
    return await this.http.get(this.link+"/"+id).toPromise();
  }

}
