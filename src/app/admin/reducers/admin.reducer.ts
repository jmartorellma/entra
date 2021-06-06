import { Action, createReducer, on } from "@ngrx/store";
import { UserDTO } from "src/app/profile/models/userDTO";
import { loadUsers, loadUsersError, loadUsersSuccess } from "../actions";

export interface AdminState {
    userList: UserDTO[] | null;
    error: any;
    pending: boolean;
}

export const initialState: AdminState = {
    userList: null,
    error: null,
    pending: false
};

const _adminReducer = createReducer(
    initialState,
    on(loadUsers, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(loadUsersSuccess, (state, action) => ({
        ...state,
        userList: [...action.userList],
        error: null,
        pending: false,
    })),
    on(loadUsersError, (state, {payload}) => ({
        ...state,
        error: payload.error,
        pending: false,
    }))
  );


export function adminReducer(state: AdminState | undefined, action: Action) {
    return _adminReducer(state, action);
}