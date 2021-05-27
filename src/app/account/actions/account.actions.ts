import { createAction, props } from '@ngrx/store';
import { CredentialsModel } from '../models/credentialsModel';
import { RegisterModel } from '../models/registerModel';

export const login = createAction(
    '[ACCOUNT] Login',
    props<{ credentials: CredentialsModel }>()
);

export const loginSuccess = createAction(
    '[ACCOUNT] Login Success',
    props<{ username: string | undefined }>()
);

export const loginError = createAction(
    '[ACCOUNT] Login Error',
    props<{ payload: any }>()
);

export const registerUser = createAction(
    '[ACCOUNT] Register User',
    props<{ registerModel: RegisterModel }>()
);

export const registerUserSuccess = createAction(
    '[ACCOUNT] Register User Success',
    props<{ payload: any }>()
);

export const registerUserError = createAction(
    '[ACCOUNT] Register User Error',
    props<{ payload: any }>()
);

export const resetPassword = createAction(
    '[ACCOUNT] Register User',
    props<{ email: string }>()
);

export const resetPasswordSuccess = createAction(
    '[ACCOUNT] Register User Success',
    props<{ payload: any }>()
);

export const resetPasswordError = createAction(
    '[ACCOUNT] Register User Error',
    props<{ payload: any }>()
);