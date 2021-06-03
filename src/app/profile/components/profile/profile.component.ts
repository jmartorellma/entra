import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public secretResult: string = 'No secret result';
  public openResult: string = 'No open result';

  constructor(private oidcSecurityService: OidcSecurityService, 
    private http: HttpClient) {}

  ngOnInit() {
    this.oidcSecurityService.userData$.subscribe((data) => {
      console.log(data)
    });
  }

  getUserData() {
    return this.oidcSecurityService.userData$.pipe(
      map((isAuthorized: boolean) => {
        console.log('AuthGuard, canActivate isAuthorized: ' + isAuthorized);
        
      })
    );
  }

  getUsers(){
    this.getApiUsers()
      .subscribe((data: UserDTO) => console.log(data));
  }

  getApiUsers(): Observable<UserDTO> {
    const configSecert = 'https://localhost:44367/Users';
    return this.http.get<UserDTO>(configSecert)
      .pipe(
        tap(
          data => data,
          error => console.log(error)
        )
      );
  }

  showOpenResult(){
    this.callApiOpen()
      .subscribe((data: ApiResul) => this.openResult = data.result);
  }

  callApiOpen(): Observable<ApiResul> {
    const configOpen = 'https://localhost:44367/users/opened';
    return this.http.get<ApiResul>(configOpen)
      .pipe(
        tap(
          data => data,
          error => error
        )
      );
  }

}

export interface UserDTO {
  Id: number;
  Name: string; 
  Surname: string;
  IsActive: boolean;
  UserName: string;
  Email: string; 
  PhoneNumber: string;
  CreationDate: Date;
}

export interface ApiResul{
  result: string
}