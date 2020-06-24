import { Component } from '@angular/core';
import { MesaService } from '../services/mesa/mesa.service';
import { Mesa } from '../interfaces/mesa';
import { Garcon } from '../interfaces/garcon';
import { GarconService } from '../services/garcon/garcon.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listaMesa: Mesa[] = [];
  listaGarcon: Garcon[] = [];
  mesa: Mesa;
  aux: any;
  id = {
    "id": ""
  };
  auxID = {
    "id": ""
  };
  imagem = "https://www.emporiotambo.com.br/pub/media/resized/1300x800/ves/blog/xguia-de-mesa.jpg.pagespeed.ic.KcGlK-6Bkk.webp"
  constructor(
    private serviceMesa: MesaService,
    private garconService: GarconService,
    private activeRoute: ActivatedRoute,
    private userService: UserService
  ) { }
  async ngOnInit() {
    this.activeRoute.params.subscribe(dado => {
      this.aux = dado;
      this.auxID = this.aux;
      if (Object.keys(dado).length >= 1 && this.auxID.id != "") {
        this.aux = dado;
        this.id = this.aux
      }
    })
    this.aux = await this.serviceMesa.getMesa();
    this.listaMesa = this.aux;
    this.aux = await this.garconService.getGarcon();
    this.listaGarcon = this.aux;
  }
  async reservarMesa(id) {
    let resp: any;
    this.listaMesa.forEach(mesa => {
      if (mesa.id == id) {
        mesa.status = "OCUPADA";
        resp = this.serviceMesa.mesaPut(mesa);
        this.adicionarMesaUsuario(mesa.id);

      }
    })
    return await resp;


  }
  async adicionarMesaUsuario(id) {
    let resp: any;
    let user: Usuario
    resp = await this.userService.getUserByID(this.id.id);
    user = resp;
    user.id_mesa = id;
    let reposta =  await this.userService.put(user);
    return reposta
  }

}
