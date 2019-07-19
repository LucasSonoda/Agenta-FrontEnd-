import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subgrupo } from '../entities/Subgrupo';
import { GlobalConst } from '../entities/GlobalConst';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubgrupoService {

  private urlEndPoint: string = null;
  private subRuta: string = "/subgrupo"

  constructor(
    private http: HttpClient
    , private global: GlobalConst) {
    this.urlEndPoint = global.urlEndPointRestTest + this.subRuta;
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/all`)
  }

  save(subgrupo: Subgrupo): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/save`, subgrupo)
  }

  delete(subgrupo: Subgrupo): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${subgrupo.id}`)
  }

  update(subgrupo: Subgrupo): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/update`, subgrupo)
  }
}
