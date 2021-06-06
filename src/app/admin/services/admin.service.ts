import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/profile/models/userDTO';

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

}
