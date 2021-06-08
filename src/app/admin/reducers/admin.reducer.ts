import { Action, createReducer, on } from "@ngrx/store";
import { ShopDTO } from "src/app/backoffice/models/ShopDTO";
import { UserDTO } from "src/app/profile/models/userDTO";
import * as AdminActions from '../actions';
import { PaymentStatusDTO } from "../models/PaymentStatusDTO";
import { PurchaseTypeDTO } from "../models/PurchaseTypeDTO";

export interface AdminState {
    userList: UserDTO[];
    shopList: ShopDTO[];
    roleList: string[];
    paymentStatusList: PaymentStatusDTO[];
    purchaseTypeList: PurchaseTypeDTO[];
    error: any;
    pending: boolean;
}

export const initialState: AdminState = {
    userList: [],
    shopList: [],
    roleList: [],
    paymentStatusList: [],
    purchaseTypeList: [],
    error: null,
    pending: false
};

const _adminReducer = createReducer(
    initialState,
    on(AdminActions.loadUsers, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.loadUsersSuccess, (state, action) => ({
        ...state,
        userList: [...action.userList],
        error: null,
        pending: false,
    })),
    on(AdminActions.loadUsersError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.loadRoles, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.loadRolesSuccess, (state, action) => ({
        ...state,
        roleList: [...action.roleList],
        error: null,
        pending: false,
    })),
    on(AdminActions.loadRolesError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.createUser, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.createUserSuccess, (state, action) => ({
        ...state,
        userList: [...state.userList, action.user],
        error: null,
        pending: false,
    })),
    on(AdminActions.createUserError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.updateUser, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.updateUserSuccess, (state, action) => ({
        ...state,
        userList: state.userList.map(u => {
            if(u.id === action.user.id) {
                return { ...u, ...action.user }; 
            }
            else {
                return u;
            }
        }),
        error: null,
        pending: false,
    })),
    on(AdminActions.updateUserError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.updateUserPassword, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.updateUserPasswordSuccess, (state, action) => ({
        ...state,
        userList: state.userList.map(u => {
            if(u.id === action.user.id) {
                return { ...u, ...action.user }; 
            }
            else {
                return u;
            }
        }),
        error: null,
        pending: false,
    })),
    on(AdminActions.updateUserPasswordError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.deleteUser, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.deleteUserSuccess, (state, action) => ({
        ...state,
        userList: [...state.userList.filter(u => u.id !== action.userId)],
        error: null,
        pending: false,
    })),
    on(AdminActions.deleteUserError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.loadShops, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.loadShopsSuccess, (state, action) => ({
        ...state,
        shopList: [...action.shopList],
        error: null,
        pending: false,
    })),
    on(AdminActions.loadShopsError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.createShop, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.createShopSuccess, (state, action) => ({
        ...state,
        error: null,
        shopList: [...state.shopList, action.shop],
        pending: false,
    })),
    on(AdminActions.createShopError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.updateShop, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.updateShopSuccess, (state, action) => ({
        ...state,
        shopList: state.shopList.map(s => {
            if(s.id === action.shop.id) {
                return { ...s, ...action.shop }; 
            }
            else {
                return s;
            }
        }),
        error: null,
        pending: false,
    })),
    on(AdminActions.updateShopError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.deleteShop, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.deleteShopSuccess, (state, action) => ({
        ...state,
        shopList: [...state.shopList.filter(s => s.id !== action.shopId)],
        error: null,
        pending: false,
    })),
    on(AdminActions.deleteShopError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.loadPaymentStatus, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.loadPaymentStatusSuccess, (state, action) => ({
        ...state,
        paymentStatusList: [...action.paymentStatusList],
        error: null,
        pending: false,
    })),
    on(AdminActions.loadPaymentStatusError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.createPaymentStatus, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.createPaymentStatusSuccess, (state, action) => ({
        ...state,
        error: null,
        paymentStatusList: [...state.shopList, action.paymentStatus],
        pending: false,
    })),
    on(AdminActions.createPaymentStatusError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.updatePaymentStatus, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.updatePaymentStatusSuccess, (state, action) => ({
        ...state,
        paymentStatusList: state.paymentStatusList.map(p => {
            if(p.id === action.paymentStatus.id) {
                return { ...p, ...action.paymentStatus }; 
            }
            else {
                return p;
            }
        }),
        error: null,
        pending: false,
    })),
    on(AdminActions.updatePaymentStatusError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.deletePaymentStatus, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.deletePaymentStatusSuccess, (state, action) => ({
        ...state,
        paymentStatusList: [...state.paymentStatusList.filter(p => p.id !== action.paymentStatusId)],
        error: null,
        pending: false,
    })),
    on(AdminActions.deletePaymentStatusError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.loadPurchaseTypes, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.loadPurchaseTypesSuccess, (state, action) => ({
        ...state,
        purchaseTypeList: [...action.purchaseTypeList],
        error: null,
        pending: false,
    })),
    on(AdminActions.loadPurchaseTypesError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.createPurchaseType, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.createPurchaseTypeSuccess, (state, action) => ({
        ...state,
        error: null,
        purchaseTypeList: [...state.shopList, action.purchaseType],
        pending: false,
    })),
    on(AdminActions.createPurchaseTypeError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.updatePurchaseType, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.updatePurchaseTypeSuccess, (state, action) => ({
        ...state,
        purchaseTypeList: state.purchaseTypeList.map(p => {
            if(p.id === action.purchaseType.id) {
                return { ...p, ...action.purchaseType }; 
            }
            else {
                return p;
            }
        }),
        error: null,
        pending: false,
    })),
    on(AdminActions.updatePurchaseTypeError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
    on(AdminActions.deletePurchaseType, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AdminActions.deletePurchaseTypeSuccess, (state, action) => ({
        ...state,
        purchaseTypeList: [...state.purchaseTypeList.filter(p => p.id !== action.purchaseTypeId)],
        error: null,
        pending: false,
    })),
    on(AdminActions.deletePurchaseTypeError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    })),
  );


export function adminReducer(state: AdminState | undefined, action: Action) {
    return _adminReducer(state, action);
}