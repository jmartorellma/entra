import { Action, createReducer, on } from "@ngrx/store";
import * as AdminActions from '../actions';
import { ShopDTO } from "../models/ShopDTO";

export interface BackofficeState {
    shop: ShopDTO | any;
    productList: string[];
    error: any;
    pending: boolean;
}

export const initialState: BackofficeState = {
    shop: null,
    productList: [],
    error: null,
    pending: false
};

const _backofficeReducer = createReducer(
    initialState,
    on(AdminActions.loadShop, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.loadShopSuccess, (state, action) => ({
        ...state,
        shop: action.shop,
        error: null,
        pending: false,
    })),
    on(AdminActions.loadShopError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.uploadShopPicture, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.uploadShopPictureSuccess, (state, action) => ({
        ...state,
        shop: {...state.shop, picture: action.picture.filePath },
        error: null,
        pending: false,
    })),
    on(AdminActions.uploadShopPictureError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    }))
  );


export function backofficeReducer(state: BackofficeState | undefined, action: Action) {
    return _backofficeReducer(state, action);
}