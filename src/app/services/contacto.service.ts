import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Contacto } from '../entities/Contacto';
import { catchError } from 'rxjs/operators';
import { GlobalConst } from '../entities/GlobalConst';
import { AuthService } from './auth.service';
import { stringify } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private urlEndPoint: string = null;
  private subRuta: string = "/contacto";


  constructor(
    private http: HttpClient
    , private global: GlobalConst) {
    this.urlEndPoint = global.urlEndPointRestTest + this.subRuta;
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${id}`);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/all`)
  }

  getByGrupo(id:number):Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/bygrupo/${id}`)
  }

  searchContaco(busqueda:string):Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/search/${busqueda}`)
  }
  save(contacto: Contacto): Observable<any> {

    if (contacto.numero_2 == null || contacto.numero_2.length == 0) {
      contacto.numero_2 = null;
    }

    return this.http.post<any>(`${this.urlEndPoint}/save`, contacto).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        return throwError(e);

      })
    );
  }

  delete(contacto: Contacto): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${contacto.id}`)
  }

  update(contacto: Contacto): Observable<any> {

    if (contacto.numero_2 == null || contacto.numero_2.length == 0) {
      contacto.numero_2 = null;
    }

    return this.http.put<any>(`${this.urlEndPoint}/update`, contacto).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }
        return throwError(e);

      })
    );
  }
}
