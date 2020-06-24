import { Component, OnInit } from '@angular/core';
import { Produtos } from '../interfaces/produtos';
import { Usuario } from '../interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario = {} as Usuario;
  user: Usuario;
  erroLogin = true;
  constructor(
    private fireBase: AngularFireAuth,
    private route: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  async login() {
    let resp = await this.fireBase.signInWithEmailAndPassword(this.usuario.nome, this.usuario.senha).
      then((resp) => this.carregarUser(resp))
      .catch((error) => this.erroLogin = error)
    console.log("arrumar um jeito de validar se o campo esta preenchido")

  }
  cadastrar() {
    this.route.navigate(['cadastro']);
  }
  async carregarUser(fire) {
    this.user = this.usuario;
    this.user.fire = fire;
    let userId = await this.userService.getUserByEmail(this.user.nome);
    this.route.navigate(['tabs', { id: userId }]);
  }
}
