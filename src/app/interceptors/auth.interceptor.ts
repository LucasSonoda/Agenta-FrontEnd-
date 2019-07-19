import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(private _authService: AuthService,
        private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        return next.handle(req).pipe(

            catchError(e => {
                if (e.status == 400) {
                }

                if (e.status == 401) {
                    if (this._authService.isAuthenticated()) {
                        alert("Sesion caducada.")
                        this._authService.logout();
                        this.router.navigate(['/login']);
                    }
                    this.router.navigate(['/login']);
                }
                if (e.status == 403) {
                    alert("Acceso Denegado: No existen los permisos suficientes para utilizar en este modulo.");
                    this.router.navigate(['/home']);
                }
                return throwError(e);
            })

        );
    }
}