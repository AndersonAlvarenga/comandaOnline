import { Component } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { Usuario } from '../interfaces/usuario';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeInterval } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  listaUser: Usuario;
  aux: any;
  progress = true;
  id = {
    "id": ""
  };
  auxId = {
    "id": ""
  };
  constructor(
    private userService: UserService,
    private activeRouter: ActivatedRoute,
    private route: Router,
  ) { }

  async ngOnInit() {
    
    this.activeRouter.params.subscribe(dado => {
      this.aux = dado;
      this.auxId = this.aux;
      if (Object.keys(dado).length >= 1 && this.auxId.id != "") {
        this.aux = dado;
        this.id = this.aux
      }
    })
  }
  ionViewWillEnter(){
    
    this.carregarUser(this.id);
    this.progress=true;
    console.log("1")
    console.log(this.progress)
    setInterval(() => {
      this.eliminarProgress();
    }, 3000);
  } 
  eliminarProgress() {
    this.progress = false;
  }
  async carregarUser(id) {
    this.aux = await this.userService.getUserByID(this.id.id);
    this.listaUser = this.aux;
    return this.listaUser
  }
  sair() {
    this.route.navigate([''])
  }
}