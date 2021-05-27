import { login, loginError, loginSuccess, registerUser, registerUserError, registerUserSuccess, resetPassword, resetPasswordError, resetPasswordSuccess } from '../actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface AccountState {
    loggedIn: boolean;
    error: any;
    pending: boolean;
}

export const initialState: AccountState = {
    loggedIn: false,
    error: null,
    pending: false
};

const _accountReducer = createReducer(
    initialState,
    on(login, (state) => ({
        ...state,
        loggedIn: false,
        error: null,
        pending: true,
    })),
    on(loginSuccess, (state, action) => ({
        ...state,
        loggedIn: true,
        error: null,
        pending: false,
    })),
    on(loginError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        loggedIn: false,
        pending: false,
    })),
    on(registerUser, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(registerUserSuccess, (state, action) => ({
        ...state,
        error: null,
        pending: false,
    })),
    on(registerUserError, (state, { payload }) => ({
        ...state,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        },
        pending: false,
    })),
    on(resetPassword, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(resetPasswordSuccess, (state, action) => ({
        ...state,
        error: null,
        pending: false,
    })),
    on(resetPasswordError, (state, { payload }) => ({
        ...state,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        },
        pending: false,
    }))
  );


export function accountReducer(state: AccountState | undefined, action: Action) {
    return _accountReducer(state, action);
}