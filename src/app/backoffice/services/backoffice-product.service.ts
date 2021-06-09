import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { ProductDTO } from '../models/productDTO';

@Injectable({
  providedIn: 'root'
})
export class BackofficeProductService {
  
  private productUrl = `${AppConfiguration.Setting().apiEndpoint}/Product`;

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getByShopId(id: number): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.productUrl}/Shop/${id}`);
  }

  getProduct(id: number): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(`${this.productUrl}/${id}`);
  }

  // uploadProductPicture(pictureModel: EditShopPictureModel) {
  //   const formData = new FormData();
  //   formData.append('file', pictureModel.file, pictureModel.file.name);
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'shopId': pictureModel.id.toString() })
  //   };
  //   return this.http.post<PictureDTO>(`${this.shopUrl}/Picture`, formData, httpOptions);
  // }

  // updateProduct(editShopModel: EditShopBackofficeModel): Observable<ShopDTO> {
  //   return this.http.put<ShopDTO>(this.shopUrl, editShopModel, this.httpOptions);
  // }
}
