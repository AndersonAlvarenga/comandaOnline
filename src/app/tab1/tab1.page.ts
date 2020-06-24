import { Component } from '@angular/core';
import { ProdutoService } from '../services/produto/produto.service';
import { Produtos } from '../interfaces/produtos';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { UserService } from '../services/user/user.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  produto: Produtos[];
  aux: any;
  id = {
    "id": ""
  };
  auxId = {
    "id": ""
  };
  usuario: Usuario;

  constructor(
    private produtoService: ProdutoService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private toastController: ToastController,
    private router: Router
  ) { }
//teset
  async ngOnInit() {
    this.activeRoute.params.subscribe(dado => {
      this.aux = dado;
      this.auxId = this.aux;
      if (Object.keys(dado).length >= 1 && this.auxId.id != "") {
        this.aux = dado;
        this.id = this.aux
      }
    })
    this.aux = await this.produtoService.getProdutos();
    this.produto = this.aux;
    this.produto.forEach(produto => {
      produto.quantidade = 0;
    })
    this.aux = await this.userService.getUserByID(this.id.id);
    this.usuario = this.aux;
  }
  adicionar(id) {
    this.produto.forEach(produto => {
      if (produto.id == id) {
        produto.quantidade += 1;
      }
    })
  }
  debitar(id) {
    this.produto.forEach(produto => {
      if (produto.id == id) {
        if (produto.quantidade > 0) {
          produto.quantidade -= 1;
        }
      }
    })
  }
  fazerPedido() {
    if (this.usuario.id_mesa == null) {
      this.presentToast();
      this.router.navigate(['tabs', { id: this.id.id },'tab2',{ id: this.id.id }])
    }
    this.produto.forEach(produto => {
      if (produto.quantidade > 0) {
        //fazer pedido
        console.log("criar metodo para fazer o pedido e adicionar a comanda, no primeiro pedido criar a comanda")
        //adicionar na comanda
      }
    })
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'O USUÁRIO DEVE ESCOLHER UMA MESA ANTES DE FAZER O PEDIDO',
      duration: 2000
    });
    toast.present();
  }

}
