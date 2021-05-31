import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccountState } from 'src/app/account/reducers';
import { AppState } from 'src/app/app.reducer';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public accountState$: AccountState | undefined;

  constructor(
    private store: Store<AppState>,
    private router: Router) {
      this.store.select('account').subscribe(account => 
        this.accountState$ = account
      );
    }

  ngOnInit() {

  }


  login() {
    this.router.navigate(['accounts','login']);
  }

  profile() {
    this.router.navigate(['profiles', 'profile']);
  }
  
}
