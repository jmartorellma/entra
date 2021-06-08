import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { CreatePurchaseTypeModel } from '../models/createPurchaseTypeModel';
import { EditPurchaseTypeModel } from '../models/editPurchaseTypeModel';
import { PurchaseTypeDTO } from '../models/PurchaseTypeDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminPurchaseTypesService {

  private purchaseTypeUrl = `${AppConfiguration.Setting().apiEndpoint}/PurchaseType`;

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPurchaseTypes(): Observable<PurchaseTypeDTO[]> {
    return this.http.get<PurchaseTypeDTO[]>(this.purchaseTypeUrl);
  }

  createPurchaseType(createPurchaseTypeModel: CreatePurchaseTypeModel): Observable<PurchaseTypeDTO> {
    return this.http.post<PurchaseTypeDTO>(this.purchaseTypeUrl, createPurchaseTypeModel, this.httpOptions);
  }

  updatePurchaseType(editPurchaseTypeModel: EditPurchaseTypeModel): Observable<PurchaseTypeDTO> {
    return this.http.put<PurchaseTypeDTO>(this.purchaseTypeUrl, editPurchaseTypeModel, this.httpOptions);
  }

  deletePurchaseType(id: number): Observable<number> {
    return this.http.delete<number>(`${this.purchaseTypeUrl}/${id}`);
  }
}
