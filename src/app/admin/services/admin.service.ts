import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/profile/models/userDTO';
import { CreateUserModel } from '../models/createUserModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private usersUrl = `${AppConfiguration.Setting().apiEndpoint}/Users`;

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.usersUrl);
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.usersUrl}/Roles`);
  }

  createUser(createModel: CreateUserModel): Observable<UserDTO> {
    const url = this.usersUrl;
    return this.http.post<UserDTO>(url, createModel, this.httpOptions);
  }
}
