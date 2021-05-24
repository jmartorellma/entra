import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private authUrl = 'https://localhost:44381/Auth';

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  registerUser(registerModel: RegisterModel): Observable<any> {
    const url = `${this.authUrl}/Register`;
    return this.http.post<RegisterModel>(url, registerModel, this.httpOptions);
  }

}
