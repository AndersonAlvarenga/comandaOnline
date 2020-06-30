import { Component } from '@angular/core';
import { MesaService } from '../services/mesa/mesa.service';
import { Mesa } from '../interfaces/mesa';
import { Garcon } from '../interfaces/garcon';
import { GarconService } from '../services/garcon/garcon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { UserService } from '../services/user/user.service';
import { ComandaService } from '../services/comanda/comanda.service';
import { Comanda } from '../interfaces/comanda';
import { ToastController } from '@ionic/angular';

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
  progress = true;
  id = {
    "id": ""
  };
  auxID = {
    "id": ""
  };
  usuario: Usuario;
  garcon: Garcon;
  comanda: Comanda;
  imagem = "https://www.emporiotambo.com.br/pub/media/resized/1300x800/ves/blog/xguia-de-mesa.jpg.pagespeed.ic.KcGlK-6Bkk.webp"
  constructor(
    private serviceMesa: MesaService,
    private garconService: GarconService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private comandaService: ComandaService,
    private toast: ToastController
  ) { }
  async ngOnInit() { }
  async ionViewWillEnter() {

    this.activeRoute.params.subscribe(dado => {
      this.aux = dado;
      this.auxID = this.aux;
      if (Object.keys(dado).length >= 1 && this.auxID.id != "") {
        this.aux = dado;
        this.id = this.aux
      }
    })
    
    this.aux = await this.userService.getUserByID(this.id.id);
    this.usuario = this.aux;
    

    this.aux = await this.serviceMesa.getMesa();
    this.listaMesa = this.aux;
    this.aux = await this.garconService.getGarcon();
    this.listaGarcon = this.aux;
    setInterval(() => {
      console.log("entro")
      this.eliminarProgress();
    }, 3000);
    if (this.usuario.id_mesa != null) {
      this.aux = await this.serviceMesa.getMesaById(this.usuario.id_mesa)
      this.mesa = this.aux;
    }
    if (this.mesa.id_garcon != null) {
      this.aux = await this.garconService.getGarconById(this.mesa.id_garcon);
      this.garcon = this.aux;
    }
    if (this.usuario.id_comanda!=null) {
      this.aux = await this.comandaService.getById(this.usuario.id_comanda)
      this.comanda = this.aux;
    }
   

  }
  async reservarMesa(id) {
    let resp: any;
    this.listaMesa.forEach(mesa => {
      if (mesa.id == id) {
        mesa.status = "OCUPADA";
        resp = this.serviceMesa.mesaPut(mesa);
        this.adicionarMesaUsuario(mesa.id);
        this.router.navigate(['tabs', { id: this.id.id }, 'tab1', { id: this.id.id }])
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
    let reposta = await this.userService.put(user);
    if (this.usuario.id_comanda != null) {
      this.comanda.id_mesa = id;
      this.listaMesa.forEach(mesa => {
        if (mesa.id == id) {
          this.comanda.id_garcon = mesa.id_garcon
        }
      })
      let resp = await this.comandaService.put(this.comanda);
    }
    return reposta
  }
  async alterarMesa() {
    if (this.comanda.status == "ABERTA") {
      this.usuario.id_mesa = null;
      this.mesa.status = "DISPONIVEL";
      this.comanda.id_mesa = null;
      this.comanda.id_garcon = null;
      let resp: any = await this.comandaService.put(this.comanda);
      resp = await this.serviceMesa.mesaPut(this.mesa);
    } else {
      this.presentToast("SUA COMANDA NÃO ESTA ABERTA")
    }

  }
  eliminarProgress() {
    this.progress = false;
  }
  async presentToast(mensagem) {
    const toast = await this.toast.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

}
