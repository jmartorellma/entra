import { createAction, props } from '@ngrx/store';
import { RegisterModel } from '../models/registerModel';

export const registerUser = createAction(
    '[ACCOUNT] Register User',
    props<{registerModel: RegisterModel}>()
);

export const registerUserSuccess = createAction(
    '[ACCOUNT] Register User Success',
    props<{registerModel: RegisterModel}>()
);

export const registerUserError = createAction(
    '[ACCOUNT] Register User Error',
    props<{ payload: any }>()
);