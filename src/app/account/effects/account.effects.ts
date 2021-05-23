import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AccountService } from "../services/account.service";
import * as AccountActions from '../actions';

@Injectable()
export class AccountEffects {
    
    constructor(
        private actions$: Actions,
        private accountService: AccountService,
        private router: Router
    ) {}

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.registerUser),
            mergeMap((m) =>
                this.accountService.registerUser(m.registerModel).pipe(
                    map((registerModel) =>
                        AccountActions.registerUserSuccess({registerModel: registerModel})
                    ),
                    catchError((error) => 
                        of(AccountActions.registerUserError({ payload: error }))
                    )
                )
            )
        )
    );
  
    updateUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.registerUserSuccess),
            map(() => {
                this.router.navigate(['accounts','login']);
            })
        ),
        { dispatch: false }
    );
}

