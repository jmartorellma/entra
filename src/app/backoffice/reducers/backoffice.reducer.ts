import { Action, createReducer, on } from "@ngrx/store";
import * as BackofficeActions from '../actions';
import { CategoryDTO } from "../models/CategoryDTO";
import { PaymentMethodDTO } from "../models/paymentMethodDTO";
import { ProductDTO } from "../models/productDTO";
import { ProviderDTO } from "../models/ProviderDTO";
import { ShopDTO } from "../models/ShopDTO";

export interface BackofficeState {
    shop: ShopDTO | any;
    productList: ProductDTO[];
    categoryList: CategoryDTO[];
    providerList: ProviderDTO[];
    paymentMethodList: PaymentMethodDTO[];
    error: any;
    pending: boolean;
}

export const initialState: BackofficeState = {
    shop: null,
    productList: [],
    categoryList: [],
    providerList: [],
    paymentMethodList: [],
    error: null,
    pending: false
};

const _backofficeReducer = createReducer(
    initialState,
    on(BackofficeActions.loadShop, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.loadShopSuccess, (state, action) => ({
        ...state,
        shop: action.shop,
        error: null,
        pending: false,
    })),
    on(BackofficeActions.loadShopError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.loadShopById, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.loadShopByIdSuccess, (state, action) => ({
        ...state,
        shop: action.shop,
        error: null,
        pending: false,
    })),
    on(BackofficeActions.loadShopByIdError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.uploadShopPicture, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.uploadShopPictureSuccess, (state, action) => ({
        ...state,
        shop: {...state.shop, picture: action.picture.filePath },
        error: null,
        pending: false,
    })),
    on(BackofficeActions.uploadShopPictureError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.updateShop, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.updateShopSuccess, (state, action) => ({
        ...state,
        shop: action.shop,
        error: null,
        pending: false,
    })),
    on(BackofficeActions.updateShopError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.loadShopProducts, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.loadShopProductsSuccess, (state, action) => ({
        ...state,
        productList: action.productList,
        error: null,
        pending: false,
    })),
    on(BackofficeActions.loadShopProductsError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.loadProduct, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.loadProductSuccess, (state, action) => ({
        ...state,
        productList: state.productList.map(p => {
            if(p.id === action.product.id) {
                return { ...p, ...action.product }; 
            }
            else {
                return p;
            }
        }),
        error: null,
        pending: false,
    })),
    on(BackofficeActions.loadProductError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.createProduct, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.createProductSuccess, (state, action) => ({
        ...state,
        productList: [...state.productList, action.product],
        error: null,
        pending: false,
    })),
    on(BackofficeActions.createProductError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.updateProduct, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.updateProductSuccess, (state, action) => ({
        ...state,
        productList: state.productList.map(p => {
            if(p.id === action.product.id) {
                return { ...p, ...action.product }; 
            }
            else {
                return p;
            }
        }),
        error: null,
        pending: false,
    })),
    on(BackofficeActions.updateProductError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.deleteProduct, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.deleteProductSuccess, (state, action) => ({
        ...state,
        productList: [...state.productList.filter(p => p.id !== action.id)],
        error: null,
        pending: false,
    })),
    on(BackofficeActions.deleteProductError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.loadCategories, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.loadCategoriesSuccess, (state, action) => ({
        ...state,
        categoryList: action.categoryList,
        error: null,
        pending: false,
    })),
    on(BackofficeActions.loadCategoriesError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.createCategory, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.createCategorySuccess, (state, action) => ({
        ...state,
        categoryList: [...state.categoryList, action.category],
        error: null,
        pending: false,
    })),
    on(BackofficeActions.createCategoryError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.updateCategory, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.updateCategorySuccess, (state, action) => ({
        ...state,
        categoryList: state.categoryList.map(c => {
            if(c.id === action.category.id) {
                return { ...c, ...action.category }; 
            }
            else {
                return c;
            }
        }),
        error: null,
        pending: false,
    })),
    on(BackofficeActions.updateCategoryError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.deleteCategory, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.deleteCategorySuccess, (state, action) => ({
        ...state,
        categoryList: [...state.categoryList.filter(c => c.id !== action.id)],
        error: null,
        pending: false,
    })),
    on(BackofficeActions.deleteCategoryError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.loadProviders, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.loadProvidersSuccess, (state, action) => ({
        ...state,
        providerList: action.providerList,
        error: null,
        pending: false,
    })),
    on(BackofficeActions.loadProvidersError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.createProvider, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.createProviderSuccess, (state, action) => ({
        ...state,
        providerList: [...state.providerList, action.provider],
        error: null,
        pending: false,
    })),
    on(BackofficeActions.createProviderError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.updateProvider, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.updateProviderSuccess, (state, action) => ({
        ...state,
        providerList: state.providerList.map(p => {
            if(p.id === action.provider.id) {
                return { ...p, ...action.provider }; 
            }
            else {
                return p;
            }
        }),
        error: null,
        pending: false,
    })),
    on(BackofficeActions.updateProviderError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.deleteProvider, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.deleteProviderSuccess, (state, action) => ({
        ...state,
        providerList: [...state.providerList.filter(c => c.id !== action.id)],
        error: null,
        pending: false,
    })),
    on(BackofficeActions.deleteProviderError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.loadPaymentMethods, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.loadPaymentMethodsSuccess, (state, action) => ({
        ...state,
        paymentMethodList: action.paymentMethodList,
        error: null,
        pending: false,
    })),
    on(BackofficeActions.loadPaymentMethodsError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.createPaymentMethod, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.createPaymentMethodSuccess, (state, action) => ({
        ...state,
        paymentMethodList: [...state.paymentMethodList, action.paymentMethod],
        error: null,
        pending: false,
    })),
    on(BackofficeActions.createPaymentMethodError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.updatePaymentMethod, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.updatePaymentMethodSuccess, (state, action) => ({
        ...state,
        paymentMethodList: state.paymentMethodList.map(p => {
            if(p.id === action.paymentMethod.id) {
                return { ...p, ...action.paymentMethod }; 
            }
            else {
                return p;
            }
        }),
        error: null,
        pending: false,
    })),
    on(BackofficeActions.updatePaymentMethodError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(BackofficeActions.deletePaymentMethod, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(BackofficeActions.deletePaymentMethodSuccess, (state, action) => ({
        ...state,
        paymentMethodList: [...state.paymentMethodList.filter(p => p.id !== action.id)],
        error: null,
        pending: false,
    })),
    on(BackofficeActions.deletePaymentMethodError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
  );


export function backofficeReducer(state: BackofficeState | undefined, action: Action) {
    return _backofficeReducer(state, action);
}