import { createAction, props } from "@ngrx/store";
import { UserDTO } from "../models/userDTO";

export const loadUser = createAction(
    '[PROFILE] LoadUser',
    props<{ id: number }>()
);

export const loadUserSuccess = createAction(
    '[PROFILE] LoadUser Success',
    props<{ user: UserDTO | null }>()
);

export const loadUserError = createAction(
    '[PROFILE] LoadUser Error',
    props<{ payload: any }>()
);
