import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {
  link = "http://192.168.0.105:8081/comanda"
  constructor(
    private http:HttpClient
  ) { }

}
