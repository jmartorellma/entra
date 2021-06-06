import { Action, createReducer, on } from "@ngrx/store";
import { loadUser, loadUserSuccess, loadUserError } from "../actions";
import { UserDTO } from "../models/userDTO";


export interface ProfileState {
    user: UserDTO | null;
    error: any;
    pending: boolean;
}

export const initialState: ProfileState = {
    user: null,
    error: null,
    pending: false
};

const _profileReducer = createReducer(
    initialState,
    on(loadUser, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(loadUserSuccess, (state, action) => ({
        ...state,
        user: action.user,
        error: null,
        pending: false,
    })),
    on(loadUserError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    }))
  );


export function profileReducer(state: ProfileState | undefined, action: Action) {
    return _profileReducer(state, action);
}