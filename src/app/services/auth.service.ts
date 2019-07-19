import { Injectable } from "@angular/core";
import { Usuario } from "../entities/Usuario";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalConst } from "../entities/GlobalConst";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})

export class AuthService {

  private _usuario: Usuario;
  private _token: string;
  private urlEndPoint: string;

  constructor(private http: HttpClient, private global: GlobalConst, private router: Router) {
    this.urlEndPoint = global.urlEndPointAuth;
  }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario
    } else if (this._usuario == null && localStorage.getItem('usuario') != null) {
      return this._usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    } else if (this._usuario == null && localStorage.getItem('usuario') == null && sessionStorage.getItem('usuario') != null) {
      return this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
    }
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem('token') != null) {
      this._token = localStorage.getItem('token');
    } else if (this._token == null && localStorage.getItem('token') == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
    }
  }

  login(usuario: Usuario) {
    const credenciales = btoa('internosApp' + ':' + 'alaska');
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });


    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(this.urlEndPoint, params.toString(), { headers: httpHeaders })
  }

  refreshLogin() {
    const credenciales = btoa('internosApp' + ':' + 'alaska');
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'refresh_token');
    params.set('refresh_token', localStorage.getItem("refresh_token"));
    return this.http.post<any>(this.urlEndPoint, params.toString(), { headers: httpHeaders })
  }

  saveToken(accessToken: string, save?: boolean, refresh_token?: string) {

    this._token = accessToken;
    if (save) {
      localStorage.setItem("token", this._token);
      if (refresh_token != null) {
        localStorage.setItem("refresh_token", refresh_token);
      }
    } else {
      sessionStorage.setItem("token", this._token);

    }

  }

  saveUser(accessToken: string, save: boolean) {

    let playload = this.getDataToken(accessToken)
    this._usuario = new Usuario();
    this._usuario.username = playload.user_name;
    this._usuario.roles = playload.authorities;

    if (save) {
      localStorage.setItem("usuario", JSON.stringify(this._usuario));
    } else {
      sessionStorage.setItem("usuario", JSON.stringify(this._usuario));
    }

  }

  getDataToken(accessToken: string) {
    if (accessToken != null) {
      let playload = JSON.parse(atob(accessToken.split('.')[1]))
      return playload;
    }
    return null
  }

  logout() {
    this._token = null;
    this._usuario = null;

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }

  isAuthenticated() {
    let playload = this.getDataToken(this.token);
    if (playload != null && playload.user_name && playload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role?: string): boolean {
    if(this._usuario){
      if (this._usuario.roles.includes(role)) {
        return true;
      }
    }
    return false;
  }


  isTokenExpirado(): boolean {
    let token = this.token;
    let refresh_token;
    if (localStorage.getItem('refresh_token') != null) {
      refresh_token = JSON.parse(atob(localStorage.getItem('refresh_token').split('.')[1]));
    }

    let playload = this.getDataToken(token);

    let now = new Date().getTime() / 1000;

    if (refresh_token != null) {
      if (refresh_token.exp < now) {
        console.log(refresh_token)
        localStorage.removeItem('refresh_token')
      }
    }

    if (playload.exp < now) {
      return true
    }
    return false
  }
}

