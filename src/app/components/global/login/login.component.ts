import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Usuario } from 'src/app/entities/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  save: boolean = false;
  constructor(private _authService: AuthService,
    private router: Router,
    private location: Location
  ) {
    setTimeout(() => {
      if (this._authService.isAuthenticated()) {
        this.location.back();
        alert("Ya has iniciado sesion")
      }
    }, 0);
  }


  ngOnInit() {

  }

  login() {
    this._authService.login(this.usuario).subscribe(response => {
      this._authService.saveToken(response.access_token, this.save, response.refresh_token)
      this._authService.saveUser(response.access_token, this.save)
        this.location.back();
    })
  }

  check($event: any) {
    this.save = $event.target.checked
  }
}
