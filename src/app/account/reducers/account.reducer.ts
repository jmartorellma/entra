import { login, loginError, loginSuccess, registerUser, registerUserError, registerUserSuccess } from '../actions';
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
        loggedIn: false,
        error: null,
        pending: true,
    })),
    on(registerUserSuccess, (state, action) => ({
        ...state,
        loggedIn: false,
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
        loggedIn: false,
        pending: false,
    }))
  );


export function accountReducer(state: AccountState | undefined, action: Action) {
    return _accountReducer(state, action);
}