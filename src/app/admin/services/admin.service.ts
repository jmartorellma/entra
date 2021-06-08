import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { ShopDTO } from 'src/app/backoffice/models/ShopDTO';
import { UserDTO } from 'src/app/profile/models/userDTO';
import { CreateShopModel } from '../models/createShopModel';
import { CreateUserModel } from '../models/createUserModel';
import { EditShopModel } from '../models/editShopModel';
import { EditUserModel, EditUserPasswordModel } from '../models/editUserModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private usersUrl = `${AppConfiguration.Setting().apiEndpoint}/Users`;
  private shopUrl = `${AppConfiguration.Setting().apiEndpoint}/Shops`;

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
    return this.http.post<UserDTO>(this.usersUrl, createModel, this.httpOptions);
  }

  updateUser(updateModel: EditUserModel): Observable<UserDTO> {
    return this.http.put<UserDTO>(this.usersUrl, updateModel, this.httpOptions);
  }

  updateUserPassword(updatePasswordModel: EditUserPasswordModel): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.usersUrl}/Password`, updatePasswordModel, this.httpOptions);
  }

  deleteUser(id: number): Observable<number> {
    return this.http.delete<number>(`${this.usersUrl}/${id}`);
  }

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
