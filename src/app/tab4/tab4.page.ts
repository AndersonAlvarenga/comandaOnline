import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { ComandaService } from '../services/comanda/comanda.service';
import { Usuario } from '../interfaces/usuario';
import { Comanda } from '../interfaces/comanda';
import { MesaService } from '../services/mesa/mesa.service';
import { GarconService } from '../services/garcon/garcon.service';
import { Mesa } from '../interfaces/mesa';
import { Garcon } from '../interfaces/garcon';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  aux: any;
  id = {
    "id": ""
  };
  auxId = {
    "id": ""
  };
  usuario: Usuario = {} as Usuario;
  comanda: Comanda = {} as Comanda;
  mesa: Mesa = {} as Mesa;
  garcon: Garcon = {} as Garcon;
  constructor(
    private activeRouter: ActivatedRoute,
    private userService: UserService,
    private comandaService: ComandaService,
    private mesaService: MesaService,
    private garconService: GarconService
  ) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(dado => {
      console.log(dado)
      this.aux = dado;
      this.auxId = this.aux;
      if (Object.keys(dado).length >= 1 && this.auxId.id != "") {
        this.aux = dado;
        this.id = this.aux
        console.log(this.id)
      }
    })
  }
  async ionViewWillEnter() {
    let aux: any;
    aux = await this.userService.getUserByID(this.id.id);
    this.usuario = aux;
    aux = await this.comandaService.getById(this.usuario.id_comanda);
    this.comanda = aux;
    aux = await this.mesaService.getMesaById(this.comanda.id_mesa);
    this.mesa = aux;
    aux = await this.garconService.getGarconById(this.comanda.id_garcon);
    this.garcon = aux;
  }
  fecharConta(){
    this.comanda.status="FECHAMENTO SOLICITADO"
    this.comandaService.put(this.comanda);
  }
}


