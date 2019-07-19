import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Grupo } from '../entities/Grupo';
import { Observable } from 'rxjs';
import { GlobalConst } from '../entities/GlobalConst';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private urlEndPoint: string = null;
  private subRuta: string = "/grupo";

  constructor(
    private http: HttpClient
    , private global: GlobalConst) {
    this.urlEndPoint = global.urlEndPointRestTest + this.subRuta;
  }

  getById(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.urlEndPoint}/${id}`);
  }
  getAll(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.urlEndPoint}/all`)
  }

  getIdNombre():Observable<Grupo[]>{
    return this.http.get<Grupo[]>(`${this.urlEndPoint}/all/id_nombre`);
  }
  save(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(`${this.urlEndPoint}/save`, grupo)
  }

  delete(grupo: Grupo): Observable<Grupo> {
    return this.http.delete<Grupo>(`${this.urlEndPoint}/delete/${grupo.id}`)
  }

  update(grupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.urlEndPoint}/update`, grupo)
  }

  
}
