import { Action, createReducer, on } from "@ngrx/store";
import { UserDTO } from "src/app/profile/models/userDTO";
import * as AdminActions from '../actions';

export interface AdminState {
    userList: UserDTO[];
    roleList: string[];
    error: any;
    pending: boolean;
}

export const initialState: AdminState = {
    userList: [],
    roleList: [],
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
    }))
  );


export function adminReducer(state: AdminState | undefined, action: Action) {
    return _adminReducer(state, action);
}