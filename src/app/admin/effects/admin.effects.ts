import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppConfiguration } from "read-appsettings-json";
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

    loadRoles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadRoles),
            mergeMap(() =>
                this.adminService.getRoles().pipe(
                    map((result) =>
                        AdminActions.loadRolesSuccess({ roleList: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.loadRolesError({ payload: error }))
                    )
                )
            )
        )
    );

    loadRolesError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadRolesError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );
    
    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createUser),
            mergeMap((param) =>
                this.adminService.createUser(param.user).pipe(
                    map((result) =>
                        AdminActions.createUserSuccess({ user: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.createUserError({ payload: error }))
                    )
                )
            )
        )
    );

    createUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createUserSuccess),
            map((param) => {
                this.snakBarMessage({message: `Usuario ${param.user.userName} creado correctamente`});
                this.router.navigate(['admin','users']);
            })
        ),
        { dispatch: false }
    );

    createUserError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createUserError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateUser),
            mergeMap((param) =>
                this.adminService.updateUser(param.user).pipe(
                    map((result) =>
                        AdminActions.updateUserSuccess({ user: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.updateUserError({ payload: error }))
                    )
                )
            )
        )
    );

    updateUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateUserSuccess),
            map((param) => {
                this.snakBarMessage({message: `Usuario ${param.user.userName} actualizado correctamente`});
                this.router.navigate(['admin','users']);
            })
        ),
        { dispatch: false }
    );

    updateUserError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateUserError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    updateUserPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateUserPassword),
            mergeMap((param) =>
                this.adminService.updateUserPassword(param.passModel).pipe(
                    map((result) =>
                        AdminActions.updateUserPasswordSuccess({ user: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.updateUserPasswordError({ payload: error }))
                    )
                )
            )
        )
    );

    updateUserPasswordSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateUserPasswordSuccess),
            map((param) => {
                this.snakBarMessage({message: `Contraseña ${param.user.userName} actualizada correctamente`});
                this.router.navigate(['admin','users']);
            })
        ),
        { dispatch: false }
    );

    updateUserPasswordError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateUserPasswordError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteUser),
            mergeMap((param) =>
                this.adminService.deleteUser(param.userId).pipe(
                    map((result) =>
                        AdminActions.deleteUserSuccess({ userId: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.deleteUserError({ payload: error }))
                    )
                )
            )
        )
    );

    deleteUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteUserSuccess),
            map(() => {
                this.snakBarMessage({message: "Usuario eliminado correctamente"});
                this.router.navigate(['admin','users']);
            })
        ),
        { dispatch: false }
    );

    deleteUserError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteUserError),
            map((err) => {
                this.dialogMessage(err.payload);
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