import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {


    constructor(private _authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        let token = this._authService.token
        if (token != null) {

            if (this._authService.isTokenExpirado()) { ///en caso de que el token este vencido no lo agrega a la peticion para que Auth.guard se encargue de renovarlo
                return next.handle(req);
            }

            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });

            return next.handle(authReq);
        }

        return next.handle(req);
    }
}