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

@Injectable()
export class AccountEffects {
    
    constructor(
        private actions$: Actions,
        private accountService: AccountService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.registerUser),
            mergeMap((m) =>
                this.accountService.registerUser(m.registerModel).pipe(
                    map((result) =>
                        AccountActions.registerUserSuccess({payload: result})
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

    snakBarMessage(result: any) {
        this.snackBar.open(result.message, undefined, {
            duration: 5000,
            panelClass: ['custom-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top',
        });
    } 

    dialogMessage(error: any) {
        this.dialog.open(ErrorDialogComponent, {
            width: '250px',
            data: {message: error.error}
        });
    }
}

