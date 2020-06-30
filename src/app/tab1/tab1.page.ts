import { Component } from '@angular/core';
import { ProdutoService } from '../services/produto/produto.service';
import { Produtos } from '../interfaces/produtos';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { UserService } from '../services/user/user.service';
import { ToastController } from '@ionic/angular';
import { ComandaService } from '../services/comanda/comanda.service';
import { Comanda } from '../interfaces/comanda';
import { Mesa } from '../interfaces/mesa';
import { MesaService } from '../services/mesa/mesa.service';
import { ProdutoComando } from '../interfaces/produtoComanda';
import { ReturnStatement } from '@angular/compiler';
import { Pedidos } from '../interfaces/pedidosInterface';
import { GarconService } from '../services/garcon/garcon.service';
import { Garcon } from '../interfaces/garcon';
import { PedidoService } from '../services/pedido/pedido.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  produto: Produtos[] = [];
  aux: any;
  id = {
    "id": ""
  };
  auxId = {
    "id": ""
  };
  usuario: Usuario;
  mesa: Mesa
  garcon: Garcon;
  comanda: Comanda = {} as Comanda;
  pedido: Pedidos = {} as Pedidos;
  progress: boolean = true;

  constructor(
    private produtoService: ProdutoService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private toastController: ToastController,
    private router: Router,
    private comandaService: ComandaService,
    private mesaService: MesaService,
    private garconService: GarconService,
    private pedidoService: PedidoService,
    private toast: ToastController
  ) { }
  async ngOnInit() {
  
   }
  async ionViewWillEnter() {
    this.progress = true;
    console.log(this.progress)
    this.activeRoute.params.subscribe(dado => {
      this.aux = dado;
      this.auxId = this.aux;
      if (Object.keys(dado).length >= 1 && this.auxId.id != "") {
        this.aux = dado;
        this.id = this.aux
      }
    })
    setInterval(() => {
      this.eliminarProgress();
    }, 3000);


    this.aux = await this.produtoService.getProdutos();
    this.produto = this.aux;
    this.produto.forEach(produto => {
      produto.quantidade = 0;
    })
    this.aux = await this.userService.getUserByID(this.id.id);
    this.usuario = this.aux;
    if (this.usuario.id_mesa != null) {
      this.aux = await this.mesaService.getMesaById(this.usuario.id_mesa);
      this.mesa = this.aux;
      this.aux = await this.garconService.getGarconById(this.mesa.id_garcon);
      this.garcon = this.aux;
    }

    if (this.usuario.id_comanda != null) {
      this.aux = await this.comandaService.getById(this.usuario.id_comanda);
      this.comanda = this.aux;
    }

  }
  eliminarProgress() {
    this.progress = false;
  }
  async carregarVariaveis() {
    this.aux = await this.userService.getUserByID(this.id.id);
    this.usuario = this.aux;
    if (this.usuario.id_mesa != null) {
      this.aux = await this.mesaService.getMesaById(this.usuario.id_mesa);
      this.mesa = this.aux;
      this.aux = await this.garconService.getGarconById(this.mesa.id_garcon);
      this.garcon = this.aux;
    }

    if (this.usuario.id_comanda != null) {
      this.aux = await this.comandaService.getById(this.usuario.id_comanda);
      this.comanda = this.aux;
    }

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

  async adicionarItem() {
    let aux: any = [{}];

    if (this.usuario.id_mesa == null) {
      this.presentToast("O USUÁRIO DEVE ESCOLHER UMA MESA ANTES DE FAZER O PEDIDO");
      this.router.navigate(['tabs', { id: this.id.id }, 'tab2', { id: this.id.id }])
    }
    if (this.usuario.id_comanda == null) {//verifica se o usuario ja tem uma comanda
      //caso usuario nao tem comanda
      this.comanda.date = new Date();//pega data local para adicionar a comanda
      this.comanda.id_mesa = this.mesa.id;//pega id da mesa para adicionar a comanda
      this.comanda.id_garcon = this.mesa.id_garcon;//pega id do garçon para adicionar a comanda
      this.comanda.id_cliente = this.usuario.id;//pega o id do usuário
      this.comanda.nome_cliente = this.usuario.nome;//pega nome do usuario
      this.comanda.status = "ABERTA";//Adiciona o status como ABERTA PARA A COMANDA
      this.comanda.valor_comanda = 0;//Inicia a comanda com o saldo zerado
      this.aux = [];
      this.comanda.lista_produto = this.aux;
      let aux: any = await this.comandaService.insert(this.comanda);
      this.comanda = aux;
      this.usuario.id_comanda = this.comanda.id;
      let resp = await this.userService.put(this.usuario);
    } else {
      let aux: any;
      aux = await this.comandaService.getById(this.usuario.id_comanda);
      this.comanda = aux;
    }
    if (this.comanda.status == "ABERTA") {
      let produtoComanda: ProdutoComando = {} as ProdutoComando;///variavel do tipo produto que vai na comanda
      this.produto.forEach(produto => {
        if (produto.quantidade > 0) {//verifica se a quantidade do item é maior que zero
          if (this.comanda.lista_produto.length > 0) {
            //caso tenhar produtos na comandda
            let verProdutoNaComanda = false;
            this.comanda.lista_produto.forEach(produtoNaComanda => {
              if (produtoNaComanda.id_produto == produto.id) {//verifica se o item da comanda é igual ao item que foi escolhido
                produtoNaComanda.quantidade += produto.quantidade;//soma a quantidade do item que esta na comanda com o item que foi escolhido
                produtoNaComanda.valor_total = produtoNaComanda.preco * produtoNaComanda.quantidade;//faz o calculo para somar o valor do produto na comanda
                verProdutoNaComanda = true;
              }
            })
            if (verProdutoNaComanda == false) {
              //adicionar a comanda caso o item não esteja na comanda
              produtoComanda.id_produto = produto.id;
              produtoComanda.nome_produto = produto.nome;
              produtoComanda.quantidade = produto.quantidade;
              if (produto.promocao == "EM PROMOCAO") {
                //se tiver em promoção
                produtoComanda.preco = produto.valorPromocao;

              } else {
                //caso nao esteja em promoção
                produtoComanda.preco = produto.preco;
              }
              produtoComanda.valor_total = produtoComanda.quantidade * produtoComanda.preco;
              console.log(produtoComanda)
              this.comanda.lista_produto.push(produtoComanda);
            }
          } else {
            //caso a comanda esteja vazia
            let listaProdutoComanda: ProdutoComando[] = [];
            produtoComanda.id_produto = produto.id;
            produtoComanda.nome_produto = produto.nome;
            produtoComanda.quantidade = produto.quantidade;
            if (produto.promocao == "EM PROMOCAO") {
              //se tiver em promoção
              produtoComanda.preco = produto.valorPromocao;
            } else {
              //caso nao esteja em promoção
              produtoComanda.preco = produto.preco;
            }
            produtoComanda.valor_total = produtoComanda.quantidade * produtoComanda.preco;

            console.log("impressão do item caso a comanda esteja vazia")
            let aux: any = [];
            this.comanda.lista_produto = aux;
            console.log(this.comanda.lista_produto)
            this.comanda.lista_produto.push(produtoComanda);
          }
          let resp = this.salvarComanda(this.comanda);
        }
        


      })
      this.fazerPedido();
      this.presentToast("PEDIDO FEITO COM SUCESSO");
    } else {
      this.presentToast("SUA COMANDA NÃO ESTA ABERTA");

    }
  }
  async salvarComanda(comanda: Comanda) {
    let valorTotal = 0;
    comanda.lista_produto.forEach(
      produtoComanda => {
        valorTotal = valorTotal + produtoComanda.valor_total;
      }
    )
    comanda.valor_comanda = valorTotal;
    console.log("22")
    console.log(comanda)
    return await this.comandaService.put(comanda);
  }
  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }
  async fazerPedido() {
    console.log("entro")
    let resp;
    this.produto.forEach(async produto => {
      if (produto.quantidade > 0) {
        this.pedido.date = new Date();
        this.pedido.id_comanda = this.comanda.id;
        this.pedido.id_garcon = this.comanda.id_garcon;
        this.pedido.id_mesa = this.comanda.id_mesa;
        this.pedido.id_produto = produto.id;
        this.pedido.nome_cliente = this.usuario.nome;
        this.pedido.nome_garcon = this.garcon.nome;
        this.pedido.num_mesa = this.mesa.nome;
        this.pedido.produto = produto.nome;
        this.pedido.quantidade = produto.quantidade;
        this.pedido.status = "PENDENTE";
        resp = await this.pedidoService.insert(this.pedido);
        produto.quantidade = 0;
      }

    })
    return resp;

  }
}
