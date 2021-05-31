import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as AccountActions from '../../actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  private errorMessage: string | undefined;

  constructor(
    private store: Store<AppState>,
    private router: Router) { 
    const query = window.location.search.substring(1);
    if(query) {
      const param = query.split('=');
      if(param) {
        this.errorMessage = decodeURIComponent(param[1]);
      }      
    } 
  }

  ngOnInit(): void {
    if(localStorage.getItem('loggedOutCurrentSession') !== null) {
      localStorage.removeItem('loggedOutCurrentSession');
    }
    if(this.errorMessage !== undefined && this.errorMessage !== '') {
      this.store.dispatch(AccountActions.logoutError({payload: {error: this.errorMessage}}));
    }
    else {
      this.store.dispatch(AccountActions.logoutSuccess()); 
    }
  }

}
