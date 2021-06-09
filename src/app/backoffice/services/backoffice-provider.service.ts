import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { CreateProviderModel } from '../models/createProviderModel';
import { EditProviderModel } from '../models/editProviderModel';
import { ProviderDTO } from '../models/ProviderDTO';

@Injectable({
  providedIn: 'root'
})
export class BackofficeProviderService {

  private providerUrl = `${AppConfiguration.Setting().apiEndpoint}/Provider`;

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getProviders(): Observable<ProviderDTO[]> {
    return this.http.get<ProviderDTO[]>(`${this.providerUrl}`);
  }

  createProvider(createModel: CreateProviderModel): Observable<ProviderDTO> {
    return this.http.post<ProviderDTO>(`${this.providerUrl}`, createModel);
  }

  updateProvider(updateModel: EditProviderModel): Observable<ProviderDTO> {
    return this.http.put<ProviderDTO>(`${this.providerUrl}`, updateModel);
  }

  deleteProvider(id: number): Observable<number> {
    return this.http.delete<number>(`${this.providerUrl}/${id}`);
  }
}
