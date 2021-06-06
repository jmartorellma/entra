import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ErrorDialogComponent } from "src/app/shared/components/error-dialog/error-dialog.component";
import * as AdminActions from '../actions';
import { AdminService } from "../services/admin.service";


@Injectable()
export class AdminEffects {
    
    constructor(
        private actions$: Actions,
        private adminService: AdminService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadUsers),
            mergeMap(() =>
                this.adminService.getUsers().pipe(
                    map((result) =>
                        AdminActions.loadUsersSuccess({ userList:result })
                    ),
                    catchError((error) => 
                        of(AdminActions.loadUsersError({ payload: error }))
                    )
                )
            )
        )
    );

    loadUsersError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadUsersError),
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
            width: '300px',
            data: { message: error.error }
        });
    }
}