import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { ShopDTO } from '../models/ShopDTO';

@Injectable({
  providedIn: 'root'
})
export class BackofficeShopService {

  private shopUrl = `${AppConfiguration.Setting().apiEndpoint}/Shops`;

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getShopByOwner(ownerId: number): Observable<ShopDTO> {
    return this.http.get<ShopDTO>(`${this.shopUrl}/Owner/${ownerId}`);
  }
}
