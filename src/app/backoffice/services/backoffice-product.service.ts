import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { CreateProductModel } from '../models/createProductModel';
import { EditProductModel } from '../models/editProductModel';
import { EditProductPictureModel } from '../models/editProductPictureModel';
import { ProductDTO } from '../models/productDTO';
import { ProductPictureDTO } from '../models/productPictureDTO';

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

  createProduct(createModel: CreateProductModel): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(`${this.productUrl}`, createModel);
  }

  updateProduct(updateModel: EditProductModel): Observable<ProductDTO> {
    return this.http.put<ProductDTO>(`${this.productUrl}`, updateModel);
  }

  uploadProductPicture(pictureModel: EditProductPictureModel) {
    const formData = new FormData();
    formData.append('file', pictureModel.file, pictureModel.file.name);
    const httpOptions = {
      headers: new HttpHeaders({ 'productId': pictureModel.id.toString() })
    };
    return this.http.post<ProductPictureDTO>(`${this.productUrl}/Picture`, formData, httpOptions);
  }
  
  deleteProduct(id: number): Observable<number> {
    return this.http.delete<number>(`${this.productUrl}/${id}`);
  }
}
