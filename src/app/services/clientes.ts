import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Clientes, RespuestaPaginada } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.endsWith('/')
    ? environment.apiUrl.slice(0, -1)
    : environment.apiUrl;
  private readonly url = `${this.baseUrl}/api/v1/clientes`;

  listar(page = 1, perPage = 50): Observable<RespuestaPaginada<Clientes>> {
    const params = new HttpParams()
      .set('page', page)
      .set('per_page', perPage);

    return this.http.get<RespuestaPaginada<Clientes>>(`${this.url}/`, { params });
  }

  obtener(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.url}/${id}`);
  }

  crear(cliente: Clientes): Observable<any> {
    return this.http.post(`${this.url}/`, cliente);
  }

  actualizar(id: number, cliente: Clientes): Observable<any> {
    return this.http.put(`${this.url}/${id}`, cliente);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
