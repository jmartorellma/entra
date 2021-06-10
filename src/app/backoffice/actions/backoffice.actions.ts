import { createAction, props } from "@ngrx/store";
import { PictureDTO } from "src/app/backoffice/models/PictureDTO";
import { CategoryDTO } from "../models/CategoryDTO";
import { CreateCategoryModel } from "../models/createCategoryModel";
import { CreatePaymentMethodModel } from "../models/createPaymentMethodModel";
import { CreateProductModel } from "../models/createProductModel";
import { CreateProviderModel } from "../models/createProviderModel";
import { EditCategoryModel } from "../models/editCategoryModel";
import { EditPaymentMethodModel } from "../models/editPaymentMethodModel";
import { EditProductModel } from "../models/editProductModel";
import { EditProviderModel } from "../models/editProviderModel";
import { EditShopBackofficeModel } from "../models/editShopBackofficeModel";
import { EditShopPictureModel } from "../models/edtiShopPictureModel";
import { PaymentMethodDTO } from "../models/paymentMethodDTO";
import { ProductDTO } from "../models/productDTO";
import { ProviderDTO } from "../models/ProviderDTO";
import { ShopDTO } from "../models/ShopDTO";

export const loadShop = createAction(
    '[BACKOFFICE] LoadShop',
    props<{ ownerId: number }>()
);

export const loadShopSuccess = createAction(
    '[BACKOFFICE] LoadShop Success',
    props<{ shop: ShopDTO }>()
);

export const loadShopError = createAction(
    '[BACKOFFICE] LoadShop Error',
    props<{ payload: any }>()
);

export const loadShopById = createAction(
    '[BACKOFFICE] LoadShopById',
    props<{ id: number }>()
);

export const loadShopByIdSuccess = createAction(
    '[BACKOFFICE] LoadShopById Success',
    props<{ shop: ShopDTO }>()
);

export const loadShopByIdError = createAction(
    '[BACKOFFICE] LoadShopById Error',
    props<{ payload: any }>()
);

export const uploadShopPicture = createAction(
    '[BACKOFFICE] UploadShopPicture',
    props<{ editShopPictureModel: EditShopPictureModel }>()
);

export const uploadShopPictureSuccess = createAction(
    '[BACKOFFICE] UploadShopPicture Success',
    props<{ picture: PictureDTO }>()
);

export const uploadShopPictureError = createAction(
    '[BACKOFFICE] UploadShopPicture Error',
    props<{ payload: any }>()
);

export const updateShop = createAction(
    '[BACKOFFICE] UpdateShop',
    props<{ shop: EditShopBackofficeModel }>()
);

export const updateShopSuccess = createAction(
    '[BACKOFFICE] UpdateShop Success',
    props<{ shop: ShopDTO }>()
);

export const updateShopError = createAction(
    '[BACKOFFICE] UpdateShop Error',
    props<{ payload: any }>()
);

export const loadShopProducts = createAction(
    '[BACKOFFICE] LoadShopProducts',
    props<{ shopId: number }>()
);

export const loadShopProductsSuccess = createAction(
    '[BACKOFFICE] LoadShopProducts Success',
    props<{ productList: ProductDTO[] }>()
);

export const loadShopProductsError = createAction(
    '[BACKOFFICE] LoadShopProducts Error',
    props<{ payload: any }>()
);

export const loadProduct = createAction(
    '[BACKOFFICE] loadProduct',
    props<{ id: number }>()
);

export const loadProductSuccess = createAction(
    '[BACKOFFICE] loadProduct Success',
    props<{ product: ProductDTO }>()
);

export const loadProductError = createAction(
    '[BACKOFFICE] loadProduct Error',
    props<{ payload: any }>()
);

export const createProduct = createAction(
    '[BACKOFFICE] CreateProduct',
    props<{ product: CreateProductModel }>()
);

export const createProductSuccess = createAction(
    '[BACKOFFICE] CreateProduct Success',
    props<{ product: ProductDTO }>()
);

export const createProductError = createAction(
    '[BACKOFFICE] CreateProduct Error',
    props<{ payload: any }>()
);

export const updateProduct = createAction(
    '[BACKOFFICE] UpdateProduct',
    props<{ product: EditProductModel }>()
);

export const updateProductSuccess = createAction(
    '[BACKOFFICE] UpdateProduct Success',
    props<{ product: ProductDTO }>()
);

export const updateProductError = createAction(
    '[BACKOFFICE] UpdateProduct Error',
    props<{ payload: any }>()
);

export const deleteProduct = createAction(
    '[BACKOFFICE] DeleteProduct',
    props<{ id: number }>()
);

export const deleteProductSuccess = createAction(
    '[BACKOFFICE] DeleteProduct Success',
    props<{ id: number }>()
);

export const deleteProductError = createAction(
    '[BACKOFFICE] DeleteProduct Error',
    props<{ payload: any }>()
);

export const loadCategories = createAction(
    '[BACKOFFICE] LoadCategories'
);

export const loadCategoriesSuccess = createAction(
    '[BACKOFFICE] LoadCategories Success',
    props<{ categoryList: CategoryDTO[] }>()
);

export const loadCategoriesError = createAction(
    '[BACKOFFICE] LoadCategories Error',
    props<{ payload: any }>()
);

export const createCategory = createAction(
    '[BACKOFFICE] CreateCategory',
    props<{ category: CreateCategoryModel }>()
);

export const createCategorySuccess = createAction(
    '[BACKOFFICE] CreateCategory Success',
    props<{ category: CategoryDTO }>()
);

export const createCategoryError = createAction(
    '[BACKOFFICE] CreateCategory Error',
    props<{ payload: any }>()
);

export const updateCategory = createAction(
    '[BACKOFFICE] UpdateCategory',
    props<{ category: EditCategoryModel }>()
);

export const updateCategorySuccess = createAction(
    '[BACKOFFICE] UpdateCategory Success',
    props<{ category: CategoryDTO }>()
);

export const updateCategoryError = createAction(
    '[BACKOFFICE] UpdateCategory Error',
    props<{ payload: any }>()
);

export const deleteCategory = createAction(
    '[BACKOFFICE] DeleteCategory',
    props<{ id: number }>()
);

export const deleteCategorySuccess = createAction(
    '[BACKOFFICE] DeleteCategory Success',
    props<{ id: number }>()
);

export const deleteCategoryError = createAction(
    '[BACKOFFICE] DeleteCategory Error',
    props<{ payload: any }>()
);

export const loadProviders = createAction(
    '[BACKOFFICE] LoadProviders'
);

export const loadProvidersSuccess = createAction(
    '[BACKOFFICE] LoadProviders Success',
    props<{ providerList: ProviderDTO[] }>()
);

export const loadProvidersError = createAction(
    '[BACKOFFICE] LoadProviders Error',
    props<{ payload: any }>()
);

export const createProvider = createAction(
    '[BACKOFFICE] CreateProvider',
    props<{ provider: CreateProviderModel }>()
);

export const createProviderSuccess = createAction(
    '[BACKOFFICE] CreateProvider Success',
    props<{ provider: ProviderDTO }>()
);

export const createProviderError = createAction(
    '[BACKOFFICE] CreateProvider Error',
    props<{ payload: any }>()
);

export const updateProvider = createAction(
    '[BACKOFFICE] UpdateProvider',
    props<{ provider: EditProviderModel }>()
);

export const updateProviderSuccess = createAction(
    '[BACKOFFICE] UpdateProvider Success',
    props<{ provider: ProviderDTO }>()
);

export const updateProviderError = createAction(
    '[BACKOFFICE] UpdateProvider Error',
    props<{ payload: any }>()
);

export const deleteProvider = createAction(
    '[BACKOFFICE] DeleteProvider',
    props<{ id: number }>()
);

export const deleteProviderSuccess = createAction(
    '[BACKOFFICE] DeleteProvider Success',
    props<{ id: number }>()
);

export const deleteProviderError = createAction(
    '[BACKOFFICE] DeleteProvider Error',
    props<{ payload: any }>()
);

export const loadPaymentMethods = createAction(
    '[BACKOFFICE] LoadPaymentMethods'
);

export const loadPaymentMethodsSuccess = createAction(
    '[BACKOFFICE] LoadPaymentMethods Success',
    props<{ paymentMethodList: PaymentMethodDTO[] }>()
);

export const loadPaymentMethodsError = createAction(
    '[BACKOFFICE] LoadPaymentMethods Error',
    props<{ payload: any }>()
);

export const createPaymentMethod = createAction(
    '[BACKOFFICE] CreatePaymentMethod',
    props<{ paymentMethod: CreatePaymentMethodModel }>()
);

export const createPaymentMethodSuccess = createAction(
    '[BACKOFFICE] CreatePaymentMethod Success',
    props<{ paymentMethod: PaymentMethodDTO }>()
);

export const createPaymentMethodError = createAction(
    '[BACKOFFICE] CreatePaymentMethod Error',
    props<{ payload: any }>()
);

export const updatePaymentMethod = createAction(
    '[BACKOFFICE] UpdatePaymentMethod',
    props<{ paymentMethod: EditPaymentMethodModel }>()
);

export const updatePaymentMethodSuccess = createAction(
    '[BACKOFFICE] UpdatePaymentMethod Success',
    props<{ paymentMethod: PaymentMethodDTO }>()
);

export const updatePaymentMethodError = createAction(
    '[BACKOFFICE] UpdatePaymentMethod Error',
    props<{ payload: any }>()
);

export const deletePaymentMethod = createAction(
    '[BACKOFFICE] DeletePaymentMethod',
    props<{ id: number }>()
);

export const deletePaymentMethodSuccess = createAction(
    '[BACKOFFICE] DeletePaymentMethod Success',
    props<{ id: number }>()
);

export const deletePaymentMethodError = createAction(
    '[BACKOFFICE] DeletePaymentMethod Error',
    props<{ payload: any }>()
);