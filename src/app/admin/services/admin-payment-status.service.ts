import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { CreatePaymentStatusModel } from '../models/createPaymentStatusModel';
import { EditPaymentStatusModel } from '../models/editPaymentStatusModel';
import { PaymentStatusDTO } from '../models/PaymentStatusDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminPaymentStatusService {

  private paymentStatusUrl = `${AppConfiguration.Setting().apiEndpoint}/PaymentStatus`;

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPaymentStatus(): Observable<PaymentStatusDTO[]> {
    return this.http.get<PaymentStatusDTO[]>(this.paymentStatusUrl);
  }

  createPaymentStatus(createPaymentStatusModel: CreatePaymentStatusModel): Observable<PaymentStatusDTO> {
    return this.http.post<PaymentStatusDTO>(this.paymentStatusUrl, createPaymentStatusModel, this.httpOptions);
  }

  updatePaymentStatus(editPaymentStatusModel: EditPaymentStatusModel): Observable<PaymentStatusDTO> {
    return this.http.put<PaymentStatusDTO>(this.paymentStatusUrl, editPaymentStatusModel, this.httpOptions);
  }

  deletePaymentStatus(id: number): Observable<number> {
    return this.http.delete<number>(`${this.paymentStatusUrl}/${id}`);
  }
}
