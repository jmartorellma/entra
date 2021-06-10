import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { CreatePaymentMethodModel } from '../models/createPaymentMethodModel';
import { EditPaymentMethodModel } from '../models/editPaymentMethodModel';
import { PaymentMethodDTO } from '../models/paymentMethodDTO';

@Injectable({
  providedIn: 'root'
})
export class BackofficePaymentMethodService {

  private paymentMethodUrl = `${AppConfiguration.Setting().apiEndpoint}/PaymentMethod`;

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPaymentMethods(): Observable<PaymentMethodDTO[]> {
    return this.http.get<PaymentMethodDTO[]>(`${this.paymentMethodUrl}`);
  }

  createPaymentMethod(createModel: CreatePaymentMethodModel): Observable<PaymentMethodDTO> {
    return this.http.post<PaymentMethodDTO>(`${this.paymentMethodUrl}`, createModel);
  }

  updatePaymentMethod(updateModel: EditPaymentMethodModel): Observable<PaymentMethodDTO> {
    return this.http.put<PaymentMethodDTO>(`${this.paymentMethodUrl}`, updateModel);
  }

  deletePaymentMethod(id: number): Observable<number> {
    return this.http.delete<number>(`${this.paymentMethodUrl}/${id}`);
  }
}
