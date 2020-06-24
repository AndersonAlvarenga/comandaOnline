import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  aux: any;
  email = {
    "string": ""
  };
  auxEmail = {
    "string": ""
  };
  constructor(private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(dado => {
      console.log(dado)
      this.aux = dado;
      this.auxEmail = this.aux;
      if (Object.keys(dado).length >= 1 && this.auxEmail.string != "") {
        this.aux = dado;
        this.email = this.aux
        console.log(this.email)
      }
    })
  }
}


