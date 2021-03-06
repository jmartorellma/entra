import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AccountService } from "../services/account.service";
import * as AccountActions from '../actions';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "src/app/shared/components/error-dialog/error-dialog.component";
import { AppConfiguration } from "read-appsettings-json";

@Injectable()
export class AccountEffects {
    
    constructor(
        private actions$: Actions,
        private accountService: AccountService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.login),
            map((data) => {
                localStorage.setItem('loggedCurrentSession', '1');
                this.accountService.login(data.credentials);
            })
        ),
        { dispatch: false }
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.loginSuccess),
            map((param) => {
                if(param.userData?.userName !== undefined && param.userData.showWelcome) {
                    this.snakBarMessage({message: "Bienvenido " + param.userData?.userName});
                }
            })
        ),
        { dispatch: false }
    );

    loginError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.loginError),
            map((err) => {
                if(localStorage.getItem('loggedCurrentSession') !== null) {
                    localStorage.removeItem('loggedCurrentSession');
                }
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.registerUser),
            mergeMap((m) =>
                this.accountService.registerUser(m.registerModel).pipe(
                    map((result) =>
                        AccountActions.registerUserSuccess({ payload: result })
                    ),
                    catchError((error) => 
                        of(AccountActions.registerUserError({ payload: error }))
                    )
                )
            )
        )
    );
  
    registerUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.registerUserSuccess),
            map((result) => {
                this.snakBarMessage(result.payload);
                this.router.navigate(['accounts','login']);
            })
        ),
        { dispatch: false }
    );

    registerUserError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.registerUserError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    resetPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.resetPassword),
            mergeMap((m) =>
                this.accountService.resetPassword(m.resetModel).pipe(
                    map((result) =>
                        AccountActions.resetPasswordSuccess({ payload: result })
                    ),
                    catchError((error) => 
                        of(AccountActions.resetPasswordError({ payload: error }))
                    )
                )
            )
        )
    );
  
    resetPasswordSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.resetPasswordSuccess),
            map((result) => {
                this.snakBarMessage(result.payload);
            })
        ),
        { dispatch: false }
    );

    resetPasswordError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.resetPasswordError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.logout),
            map(() => {
                localStorage.setItem('loggedOutCurrentSession', '1');
                this.accountService.logout();
            })
        ),
        { dispatch: false }
    );

    logoutSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.logoutSuccess),
            map(() => {
                this.snakBarMessage({message: "Nos vemos pronto!"});
                this.router.navigate(['shop','home']);
            })
        ),
        { dispatch: false }
    );

    logoutError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.logoutError),
            map((err) => {
                this.dialogMessage(err.payload);
                this.router.navigate(['shop','home']);
            })
        ),
        { dispatch: false }
    );

    snakBarMessage(result: any) {
        this.snackBar.open(result.message, undefined, {
            duration: AppConfiguration.Setting().snackBarDuration,
            panelClass: ['custom-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top',
        });
    } 

    dialogMessage(error: any) {
        this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: { message: error.error }
        });
    }
}

