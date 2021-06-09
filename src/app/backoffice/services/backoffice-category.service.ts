import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'read-appsettings-json';
import { Observable } from 'rxjs';
import { CategoryDTO } from '../models/CategoryDTO';
import { CreateCategoryModel } from '../models/createCategoryModel';
import { EditCategoryModel } from '../models/editCategoryModel';

@Injectable({
  providedIn: 'root'
})
export class BackofficeCategoryService {

  private categoryUrl = `${AppConfiguration.Setting().apiEndpoint}/Category`;

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(`${this.categoryUrl}`);
  }

  createCategory(createModel: CreateCategoryModel): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>(`${this.categoryUrl}`, createModel);
  }

  updateCategory(updateModel: EditCategoryModel): Observable<CategoryDTO> {
    return this.http.put<CategoryDTO>(`${this.categoryUrl}`, updateModel);
  }

  deleteCategory(id: number): Observable<number> {
    return this.http.delete<number>(`${this.categoryUrl}/${id}`);
  }
}
