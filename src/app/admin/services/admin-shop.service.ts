import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { ShopDTO } from 'src/app/backoffice/models/ShopDTO';
import { CreateShopModel } from '../models/createShopModel';
import { EditShopModel } from '../models/editShopModel';

@Injectable({
  providedIn: 'root'
})
export class AdminShopService {

  private shopUrl = `${AppConfiguration.Setting().apiEndpoint}/Shops`;

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getShops(): Observable<ShopDTO[]> {
    return this.http.get<ShopDTO[]>(this.shopUrl);
  }

  createShop(createShopModel: CreateShopModel): Observable<ShopDTO> {
    return this.http.post<ShopDTO>(this.shopUrl, createShopModel, this.httpOptions);
  }

  updateShop(editShopModel: EditShopModel): Observable<ShopDTO> {
    return this.http.put<ShopDTO>(this.shopUrl, editShopModel, this.httpOptions);
  }

  deleteShop(id: number): Observable<number> {
    return this.http.delete<number>(`${this.shopUrl}/${id}`);
  }
}
