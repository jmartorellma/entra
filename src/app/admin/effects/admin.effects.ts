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
import { AdminPaymentStatusService } from "../services/admin-payment-status.service";
import { AdminPurchaseTypesService } from "../services/admin-purchase-types.service";
import { AdminShopService } from "../services/admin-shop.service";
import { AdminService } from "../services/admin.service";


@Injectable()
export class AdminEffects {
    
    constructor(
        private actions$: Actions,
        private adminService: AdminService,
        private adminShopService: AdminShopService,
        private adminPaymentStatusService: AdminPaymentStatusService,
        private adminPurchaseTypesService: AdminPurchaseTypesService,
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
                this.snakBarMessage({message: `Contrase??a ${param.user.userName} actualizada correctamente`});
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

    loadShops$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadShops),
            mergeMap(() =>
                this.adminShopService.getShops().pipe(
                    map((result) =>
                        AdminActions.loadShopsSuccess({ shopList: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.loadShopsError({ payload: error }))
                    )
                )
            )
        )
    );

    loadShopsError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadShopsError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    createShop$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createShop),
            mergeMap((param) =>
                this.adminShopService.createShop(param.shop).pipe(
                    map((result) =>
                        AdminActions.createShopSuccess({ shop: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.createShopError({ payload: error }))
                    )
                )
            )
        )
    );

    createShopSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createShopSuccess),
            map((param) => {
                this.snakBarMessage({message: `Tienda ${param.shop.name} creada correctamente`});
                this.router.navigate(['admin','shops']);
            })
        ),
        { dispatch: false }
    );

    createShopError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createShopError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    updateShop$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateShop),
            mergeMap((param) =>
                this.adminShopService.updateShop(param.shop).pipe(
                    map((result) =>
                        AdminActions.updateShopSuccess({ shop: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.updateShopError({ payload: error }))
                    )
                )
            )
        )
    );

    updateShopSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateShopSuccess),
            map((param) => {
                this.snakBarMessage({message: `Tienda ${param.shop.name} actualizada correctamente`});
                this.router.navigate(['admin','shops']);
            })
        ),
        { dispatch: false }
    );

    updateShopError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateShopError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    deleteShop$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteShop),
            mergeMap((param) =>
                this.adminShopService.deleteShop(param.shopId).pipe(
                    map((result) =>
                        AdminActions.deleteShopSuccess({ shopId: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.deleteShopError({ payload: error }))
                    )
                )
            )
        )
    );

    deleteShopSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteShopSuccess),
            map(() => {
                this.snakBarMessage({message: "Tienda eliminada correctamente"});
                this.router.navigate(['admin','shops']);
            })
        ),
        { dispatch: false }
    );

    deleteShopError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteShopError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    ); 

    loadPaymentStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadPaymentStatus),
            mergeMap(() =>
                this.adminPaymentStatusService.getPaymentStatus().pipe(
                    map((result) =>
                        AdminActions.loadPaymentStatusSuccess({ paymentStatusList: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.loadPaymentStatusError({ payload: error }))
                    )
                )
            )
        )
    );

    loadPaymentStatusError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadPaymentStatusError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    createPaymentStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createPaymentStatus),
            mergeMap((param) =>
                this.adminPaymentStatusService.createPaymentStatus(param.paymentStatus).pipe(
                    map((result) =>
                        AdminActions.createPaymentStatusSuccess({ paymentStatus: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.createPaymentStatusError({ payload: error }))
                    )
                )
            )
        )
    );

    createPaymentStatusSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createPaymentStatusSuccess),
            map((param) => {
                this.snakBarMessage({message: `Estado de pago ${param.paymentStatus.name} creado correctamente`});
                this.router.navigate(['admin','payments']);
            })
        ),
        { dispatch: false }
    );

    createPaymentStatusError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createPaymentStatusError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    updatePaymentStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updatePaymentStatus),
            mergeMap((param) =>
                this.adminPaymentStatusService.updatePaymentStatus(param.paymentStatus).pipe(
                    map((result) =>
                        AdminActions.updatePaymentStatusSuccess({ paymentStatus: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.updatePaymentStatusError({ payload: error }))
                    )
                )
            )
        )
    );

    updatePaymentStatusSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updatePaymentStatusSuccess),
            map((param) => {
                this.snakBarMessage({message: `Estado de pago ${param.paymentStatus.name} actualizado correctamente`});
                this.router.navigate(['admin','payments']);
            })
        ),
        { dispatch: false }
    );

    updatePaymentStatusError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updatePaymentStatusError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    deletePaymentStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deletePaymentStatus),
            mergeMap((param) =>
                this.adminPaymentStatusService.deletePaymentStatus(param.paymentStatusId).pipe(
                    map((result) =>
                        AdminActions.deletePaymentStatusSuccess({ paymentStatusId: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.deletePaymentStatusError({ payload: error }))
                    )
                )
            )
        )
    );

    deletePaymentStatusSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deletePaymentStatusSuccess),
            map(() => {
                this.snakBarMessage({message: "Estado de pago eliminado correctamente"});
                this.router.navigate(['admin','payments']);
            })
        ),
        { dispatch: false }
    );

    deletePaymentStatusError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deletePaymentStatusError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );




    loadPurchaseTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadPurchaseTypes),
            mergeMap(() =>
                this.adminPurchaseTypesService.getPurchaseTypes().pipe(
                    map((result) =>
                        AdminActions.loadPurchaseTypesSuccess({ purchaseTypeList: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.loadPurchaseTypesError({ payload: error }))
                    )
                )
            )
        )
    );

    loadPurchaseTypesError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadPurchaseTypesError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    createPurchaseType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createPurchaseType),
            mergeMap((param) =>
                this.adminPurchaseTypesService.createPurchaseType(param.purchaseType).pipe(
                    map((result) =>
                        AdminActions.createPurchaseTypeSuccess({ purchaseType: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.createPurchaseTypeError({ payload: error }))
                    )
                )
            )
        )
    );

    createPurchaseTypeSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createPurchaseTypeSuccess),
            map((param) => {
                this.snakBarMessage({message: `Tipo de compra ${param.purchaseType.name} creado correctamente`});
                this.router.navigate(['admin','payments']);
            })
        ),
        { dispatch: false }
    );

    createPurchaseTypeError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.createPurchaseTypeError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    updatePurchaseType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updatePurchaseType),
            mergeMap((param) =>
                this.adminPurchaseTypesService.updatePurchaseType(param.purchaseType).pipe(
                    map((result) =>
                        AdminActions.updatePurchaseTypeSuccess({ purchaseType: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.updatePurchaseTypeError({ payload: error }))
                    )
                )
            )
        )
    );

    updatePurchaseTypeSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updatePurchaseTypeSuccess),
            map((param) => {
                this.snakBarMessage({message: `Tipo de compra ${param.purchaseType.name} actualizado correctamente`});
                this.router.navigate(['admin','payments']);
            })
        ),
        { dispatch: false }
    );

    updatePurchaseTypeError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updatePurchaseTypeError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    deletePurchaseType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deletePurchaseType),
            mergeMap((param) =>
                this.adminPurchaseTypesService.deletePurchaseType(param.purchaseTypeId).pipe(
                    map((result) =>
                        AdminActions.deletePurchaseTypeSuccess({ purchaseTypeId: result })
                    ),
                    catchError((error) => 
                        of(AdminActions.deletePurchaseTypeError({ payload: error }))
                    )
                )
            )
        )
    );

    deletePurchaseTypeSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deletePurchaseTypeSuccess),
            map(() => {
                this.snakBarMessage({message: "Tipo de compra eliminado correctamente"});
                this.router.navigate(['admin','payments']);
            })
        ),
        { dispatch: false }
    );

    deletePurchaseTypeError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deletePurchaseTypeError),
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