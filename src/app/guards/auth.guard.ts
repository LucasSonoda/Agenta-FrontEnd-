import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated()) {

      if (this._authService.isTokenExpirado()) {

        let refreh_token = localStorage.getItem("refresh_token")
        if (refreh_token != null) {
          //este bloque if renueva el token en caso de que expire. De esta manera el auth.interceptor no envia tokens vencidos.
          this._authService.refreshLogin().subscribe(response => {
            this._authService.saveToken(response.access_token, true, response.refresh_token)
          })

        } else { //en caso de que el usuario decidio no recordar la sesion la borramos una vez expirada
          alert("La sesion ha expirado.")
          this._authService.logout();
          this.router.navigate(["'/login'"]);
          return false;
        }
      }
      return true;
    } else {
      alert("Debes iniciar sesion primero");
      this.router.navigate(["'/home'"]);
      return false;
    }


  }
}
