import { Action, createReducer, on } from "@ngrx/store";
import * as BackofficeActions from '../actions';
import { CategoryDTO } from "../models/CategoryDTO";
import { ProductDTO } from "../models/productDTO";
import { ProviderDTO } from "../models/ProviderDTO";
import { ShopDTO } from "../models/ShopDTO";

export interface BackofficeState {
    shop: ShopDTO | any;
    productList: ProductDTO[];
    categoryList: CategoryDTO[];
    providerList: ProviderDTO[];
    error: any;
    pending: boolean;
}

export const initialState: BackofficeState = {
    shop: null,
    productList: [],
    categoryList: [],
    providerList: [],
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
            if(p.Id === action.product.Id) {
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
  );


export function backofficeReducer(state: BackofficeState | undefined, action: Action) {
    return _backofficeReducer(state, action);
}