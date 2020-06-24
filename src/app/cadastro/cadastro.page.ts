import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  usuario: Usuario = {} as Usuario;
  testSenha: any = {} as any;
  verificadorNome = true;
  verificadorEmail = true;
  verificadorSenha = true;
  verificadorRepSenha = true;
  verificadorSenhaCompativel = true;
  verificadorCaracter = true;
  user: User;
  aux: any;
  constructor(
    private fireBase: AngularFireAuth,
    private userService: UserService,
    private route: Router
  ) { }

  ngOnInit() {
  }
  async cadastrar() {
    let testPreenchido = true;//usuado para verificar se todos os campos foram preenchidos
    //verificador se campo nome esta preenchido
    if (this.usuario.nome == null || this.usuario.nome == "") {
      this.verificadorNome = false;
      testPreenchido = false
    } else {
      this.verificadorNome = true;
    }
    //verificador se campo email esta preenchido
    if (this.usuario.email == null || this.usuario.email == "") {
      this.verificadorEmail = false;
      testPreenchido = false
    } else {
      this.verificadorEmail = true;
    }
    //verificador se campo senha esta preenchido
    if (this.usuario.senha == null || this.usuario.senha == "") {
      this.verificadorSenha = false;
      testPreenchido = false
    } else {
      this.verificadorSenha = true;
    }
    //verificador se campo Confirmar senha foi preenchido
    if (this.testSenha.senha == null || this.testSenha.senha == "") {
      this.verificadorRepSenha = false;
      testPreenchido = false
    } else {
      this.verificadorRepSenha = true;
    }
    //verficador do numero de caracteres
    if (this.usuario.senha.length < 6) {
      this.verificadorCaracter = false;
    }
    let resp: any;
    if (testPreenchido == true) {//verifica se ta tudo preenchido
      if (this.usuario.senha == this.testSenha.senha) {//verifica se as senhas são iguais
        this.verificadorSenhaCompativel = true;
        resp = await this.fireBase.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha);//comando para criar usuário
        this.aux = this.usuario;
        this.aux.senha = null;
        this.user = this.aux;
        this.user.id_mesa=null;
        this.user.id_comanda=null;
        this.user.fire = resp;
        this.insertUser(this.user);


        return resp;
      } else {
        this.verificadorSenhaCompativel = false;
      }
    }
  }
  insertUser(user) {
    console.log(user)
    this.userService.inserUser(this.user);
    this.route.navigate(['tabs']);
  }
}
