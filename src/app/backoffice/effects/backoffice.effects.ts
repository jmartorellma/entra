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
import { BackofficeCategoryService } from "../services/backoffice-category.service";
import { BackofficePaymentMethodService } from "../services/backoffice-payment-method.service";
import { BackofficeProductService } from "../services/backoffice-product.service";
import { BackofficeProviderService } from "../services/backoffice-provider.service";
import { BackofficeShopService } from "../services/backoffice-shop.service";


@Injectable()
export class BackofficeEffects {
    
    constructor(
        private store: Store<AppState>,
        private actions$: Actions,
        private backofficeShopService: BackofficeShopService,
        private backofficeProductService: BackofficeProductService,
        private backofficeCategoryService: BackofficeCategoryService,
        private backofficeProviderService: BackofficeProviderService,
        private backofficePaymentMethodService: BackofficePaymentMethodService,
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

    loadShopById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadShopById),
            mergeMap((param) =>
                this.backofficeShopService.getShopById(param.id).pipe(
                    map((result) =>
                        BackofficeActions.loadShopByIdSuccess({ shop: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.loadShopByIdError({ payload: error }))
                    )
                )
            )
        )
    );

    loadShopByIdError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadShopByIdError),
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

    updateShop$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateShop),
            mergeMap((param) =>
                this.backofficeShopService.updateShop(param.shop).pipe(
                    map((result) =>
                        BackofficeActions.updateShopSuccess({ shop: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.updateShopError({ payload: error }))
                    )
                )
            )
        )
    );

    updateShopSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateShopSuccess),
            map((param) => {
                this.snakBarMessage({message: 'Tienda actualizada correctamente'});
            })
        ),
        { dispatch: false }
    );

    updateShopError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateShopError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    loadShopProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadShopProducts),
            mergeMap((param) =>
                this.backofficeProductService.getByShopId(param.shopId).pipe(
                    map((result) =>
                        BackofficeActions.loadShopProductsSuccess({ productList: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.loadShopProductsError({ payload: error }))
                    )
                )
            )
        )
    );

    loadShopProductsError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadShopProductsError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    loadProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadProduct),
            mergeMap((param) =>
                this.backofficeProductService.getProduct(param.id).pipe(
                    map((result) =>
                        BackofficeActions.loadProductSuccess({ product: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.loadProductError({ payload: error }))
                    )
                )
            )
        )
    );

    loadProductError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadProductError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    createProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createProduct),
            mergeMap((param) =>
                this.backofficeProductService.createProduct(param.product).pipe(
                    map((result) =>
                        BackofficeActions.createProductSuccess({ product: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.createProductError({ payload: error }))
                    )
                )
            )
        )
    );

    createProductSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createProductSuccess),
            map((param) => {
                this.snakBarMessage({message: 'Producto creado correctamente'});
                this.router.navigate(['backoffice', 'shop-admin']);
            })
        ),
        { dispatch: false }
    );

    createProductError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createProductError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateProduct),
            mergeMap((param) =>
                this.backofficeProductService.updateProduct(param.product).pipe(
                    map((result) =>
                        BackofficeActions.updateProductSuccess({ product: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.updateProductError({ payload: error }))
                    )
                )
            )
        )
    );

    updateProductSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateProductSuccess),
            map((param) => {
                this.snakBarMessage({message: 'Producto actualizado correctamente'});
                this.router.navigate(['backoffice', 'shop-admin']);
            })
        ),
        { dispatch: false }
    );

    updateProductError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateProductError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deleteProduct),
            mergeMap((param) =>
                this.backofficeProductService.deleteProduct(param.id).pipe(
                    map((result) =>
                        BackofficeActions.deleteProductSuccess({ id: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.deleteProductError({ payload: error }))
                    )
                )
            )
        )
    );

    deleteProductSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deleteProductSuccess),
            map((param) => {
                this.snakBarMessage({message: 'Producto eliminado correctamente'});
            })
        ),
        { dispatch: false }
    );

    deleteProductError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deleteProductError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadCategories),
            mergeMap((param) =>
                this.backofficeCategoryService.getCategories().pipe(
                    map((result) =>
                        BackofficeActions.loadCategoriesSuccess({ categoryList: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.loadCategoriesError({ payload: error }))
                    )
                )
            )
        )
    );

    loadCategoriesError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadCategoriesError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    createCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createCategory),
            mergeMap((param) =>
                this.backofficeCategoryService.createCategory(param.category).pipe(
                    map((result) =>
                        BackofficeActions.createCategorySuccess({ category: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.createCategoryError({ payload: error }))
                    )
                )
            )
        )
    );

    createCategorySuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createCategorySuccess),
            map((param) => {
                this.snakBarMessage({message: 'Categoría creada correctamente'});
                this.router.navigate(['backoffice', 'backoffice-categories']);
            })
        ),
        { dispatch: false }
    );

    createCategoryError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createCategoryError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    updateCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateCategory),
            mergeMap((param) =>
                this.backofficeCategoryService.updateCategory(param.category).pipe(
                    map((result) =>
                        BackofficeActions.updateCategorySuccess({ category: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.updateCategoryError({ payload: error }))
                    )
                )
            )
        )
    );

    updateCategorySuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateCategorySuccess),
            map((param) => {
                this.snakBarMessage({message: 'Categoría actualizada correctamente'});
                this.router.navigate(['backoffice', 'backoffice-categories']);
            })
        ),
        { dispatch: false }
    );

    updateCategoryError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateCategoryError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deleteCategory),
            mergeMap((param) =>
                this.backofficeCategoryService.deleteCategory(param.id).pipe(
                    map((result) =>
                        BackofficeActions.deleteCategorySuccess({ id: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.deleteCategoryError({ payload: error }))
                    )
                )
            )
        )
    );

    deleteCategorySuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deleteCategorySuccess),
            map((param) => {
                this.snakBarMessage({message: 'Categoría eliminada correctamente'});
            })
        ),
        { dispatch: false }
    );

    deleteCategoryError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deleteCategoryError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    loadProviders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadProviders),
            mergeMap((param) =>
                this.backofficeProviderService.getProviders().pipe(
                    map((result) =>
                        BackofficeActions.loadProvidersSuccess({ providerList: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.loadProvidersError({ payload: error }))
                    )
                )
            )
        )
    );

    loadProvidersError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadProvidersError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    createProvider$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createProvider),
            mergeMap((param) =>
                this.backofficeProviderService.createProvider(param.provider).pipe(
                    map((result) =>
                        BackofficeActions.createProviderSuccess({ provider: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.createProviderError({ payload: error }))
                    )
                )
            )
        )
    );

    createProviderSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createProviderSuccess),
            map((param) => {
                this.snakBarMessage({message: 'Proveedor creado correctamente'});
                this.router.navigate(['backoffice', 'backoffice-providers']);
            })
        ),
        { dispatch: false }
    );

    createProviderError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createProviderError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    updateProvider$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateProvider),
            mergeMap((param) =>
                this.backofficeProviderService.updateProvider(param.provider).pipe(
                    map((result) =>
                        BackofficeActions.updateProviderSuccess({ provider: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.updateProviderError({ payload: error }))
                    )
                )
            )
        )
    );

    updateProviderSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateProviderSuccess),
            map((param) => {
                this.snakBarMessage({message: 'Proveedor actualizado correctamente'});
                this.router.navigate(['backoffice', 'backoffice-providers']);
            })
        ),
        { dispatch: false }
    );

    updateProviderError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updateProviderError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    deleteProvider$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deleteProvider),
            mergeMap((param) =>
                this.backofficeProviderService.deleteProvider(param.id).pipe(
                    map((result) =>
                        BackofficeActions.deleteProviderSuccess({ id: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.deleteProviderError({ payload: error }))
                    )
                )
            )
        )
    );

    deleteProviderSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deleteProviderSuccess),
            map((param) => {
                this.snakBarMessage({message: 'Proveedor eliminado correctamente'});
            })
        ),
        { dispatch: false }
    );

    deleteProviderError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deleteProviderError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    loadPaymentMethods$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadPaymentMethods),
            mergeMap((param) =>
                this.backofficePaymentMethodService.getPaymentMethods().pipe(
                    map((result) =>
                        BackofficeActions.loadPaymentMethodsSuccess({ paymentMethodList: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.loadPaymentMethodsError({ payload: error }))
                    )
                )
            )
        )
    );

    loadPaymentMethodsError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.loadPaymentMethodsError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    createPaymentMethod$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createPaymentMethod),
            mergeMap((param) =>
                this.backofficePaymentMethodService.createPaymentMethod(param.paymentMethod).pipe(
                    map((result) =>
                        BackofficeActions.createPaymentMethodSuccess({ paymentMethod: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.createPaymentMethodError({ payload: error }))
                    )
                )
            )
        )
    );

    createPaymentMethodSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createPaymentMethodSuccess),
            map((param) => {
                this.snakBarMessage({message: 'Método de pago creado correctamente'});
                this.router.navigate(['backoffice', 'backoffice-payment-methods']);
            })
        ),
        { dispatch: false }
    );

    createPaymentMethodError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.createPaymentMethodError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    updatePaymentMethod$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updatePaymentMethod),
            mergeMap((param) =>
                this.backofficePaymentMethodService.updatePaymentMethod(param.paymentMethod).pipe(
                    map((result) =>
                        BackofficeActions.updatePaymentMethodSuccess({ paymentMethod : result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.updatePaymentMethodError({ payload: error }))
                    )
                )
            )
        )
    );

    updatePaymentMethodSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updatePaymentMethodSuccess),
            map((param) => {
                this.snakBarMessage({message: 'Método de pago actualizado correctamente'});
                this.router.navigate(['backoffice', 'backoffice-payment-methods']);
            })
        ),
        { dispatch: false }
    );

    updatePaymentMethodError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.updatePaymentMethodError),
            map((err) => {
                this.dialogMessage(err.payload);
            })
        ),
        { dispatch: false }
    );

    deletePaymentMethod$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deletePaymentMethod),
            mergeMap((param) =>
                this.backofficePaymentMethodService.deletePaymentMethod(param.id).pipe(
                    map((result) =>
                        BackofficeActions.deletePaymentMethodSuccess({ id: result })
                    ),
                    catchError((error) => 
                        of(BackofficeActions.deletePaymentMethodError({ payload: error }))
                    )
                )
            )
        )
    );

    deletePaymentMethodSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deletePaymentMethodSuccess),
            map((param) => {
                this.snakBarMessage({message: 'Método de pago eliminado correctamente'});
            })
        ),
        { dispatch: false }
    );

    deletePaymentMethodError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BackofficeActions.deletePaymentMethodError),
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