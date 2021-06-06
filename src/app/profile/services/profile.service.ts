import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private authUrl = `${AppConfiguration.Setting().apiEndpoint}/Users`;

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  
}
