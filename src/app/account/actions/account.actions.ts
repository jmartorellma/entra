import { createAction, props } from '@ngrx/store';
import { CredentialsModel } from '../models/credentialsModel';
import { RegisterModel } from '../models/registerModel';
import { ResetPasswordRequestModel } from '../models/resetPasswordRequestModel';

export const login = createAction(
    '[ACCOUNT] Login',
    props<{ credentials: CredentialsModel }>()
);

export const loginSuccess = createAction(
    '[ACCOUNT] Login Success',
    props<{ userData: any }>()
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
    '[ACCOUNT] Reset Password',
    props<{ resetModel: ResetPasswordRequestModel }>()
);

export const resetPasswordSuccess = createAction(
    '[ACCOUNT] Reset Password Success',
    props<{ payload: any }>()
);

export const resetPasswordError = createAction(
    '[ACCOUNT] Reset Password Error',
    props<{ payload: any }>()
);

export const logout = createAction(
    '[ACCOUNT] Logout'
);

export const logoutSuccess = createAction(
    '[ACCOUNT] Logout Success'
);

export const logoutError = createAction(
    '[ACCOUNT] Logout Error',
    props<{ payload: any }>()
);