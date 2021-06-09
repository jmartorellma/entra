import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppConfiguration } from "read-appsettings-json";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AppState } from "src/app/app.reducer";
import { ErrorDialogComponent } from "src/app/shared/components/error-dialog/error-dialog.component";
import * as BackofficeActions from '../actions';
import { BackofficeShopService } from "../services/backoffice-shop.service";


@Injectable()
export class BackofficeEffects {
    
    constructor(
        private store: Store<AppState>,
        private actions$: Actions,
        private backofficeShopService: BackofficeShopService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    loadShop$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadShop),
            mergeMap((param) =>
                this.backofficeShopService.getShopByOwner(param.ownerId).pipe(
                    map((result) =>
                        BackofficeActions.loadShopSuccess({ shop: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.loadShopError({ payload: error }))
                    )
                )
            )
        )
    );

    loadShopError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadShopError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    uploadShopPicture$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.uploadShopPicture),
            mergeMap((param) =>
                this.backofficeShopService.uploadShopPicture(param.editShopPictureModel).pipe(
                    map((result) =>
                        BackofficeActions.uploadShopPictureSuccess({ picture: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.uploadShopPictureError({ payload: error }))
                    )
                )
            )
        )
    );

    uploadShopPictureSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.uploadShopPictureSuccess),
            map((param) => {
                this.snakBarMessage({message: 'Imagen actualizada correctamente'});
                // this.router.navigateByUrl('/backoffice/shop-admin', { skipLocationChange: true }).then(() => {
                //     this.router.navigate(['backoffice','shop-admin']);
                // }); 
            })
        ),
        { dispatch: false }
    );

    uploadShopPictureError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.uploadShopPictureError),
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