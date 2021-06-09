import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { PictureDTO } from 'src/app/backoffice/models/PictureDTO';
import { EditShopBackofficeModel } from '../models/editShopBackofficeModel';
import { EditShopPictureModel } from '../models/edtiShopPictureModel';
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

  getShopById(id: number): Observable<ShopDTO> {
    return this.http.get<ShopDTO>(`${this.shopUrl}/${id}`);
  }

  uploadShopPicture(pictureModel: EditShopPictureModel) {
    const formData = new FormData();
    formData.append('file', pictureModel.file, pictureModel.file.name);
    const httpOptions = {
      headers: new HttpHeaders({ 'shopId': pictureModel.id.toString() })
    };
    return this.http.post<PictureDTO>(`${this.shopUrl}/Picture`, formData, httpOptions);
  }

  updateShop(editShopModel: EditShopBackofficeModel): Observable<ShopDTO> {
    return this.http.put<ShopDTO>(this.shopUrl, editShopModel, this.httpOptions);
  }
}
