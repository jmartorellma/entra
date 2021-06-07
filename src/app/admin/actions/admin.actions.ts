import { createAction, props } from "@ngrx/store";
import { UserDTO } from "src/app/profile/models/userDTO";
import { CreateUserModel } from "../models/createUserModel";
import { EditUserModel, EditUserPasswordModel } from "../models/editUserModel";


export const loadUsers = createAction(
    '[ADMIN] LoadUsers'
);

export const loadUsersSuccess = createAction(
    '[ADMIN] LoadUsers Success',
    props<{ userList: UserDTO[] }>()
);

export const loadUsersError = createAction(
    '[ADMIN] LoadUsers Error',
    props<{ payload: any }>()
);

export const loadRoles = createAction(
    '[ADMIN] loadRoles'
);

export const loadRolesSuccess = createAction(
    '[ADMIN] loadRoles Success',
    props<{ roleList: string[] }>()
);

export const loadRolesError = createAction(
    '[ADMIN] loadRoles Error',
    props<{ payload: any }>()
);

export const createUser = createAction(
    '[ADMIN] CreateUser',
    props<{ user: CreateUserModel }>()
);

export const createUserSuccess = createAction(
    '[ADMIN] CreateUser Success',
    props<{ user: UserDTO }>()
);

export const createUserError = createAction(
    '[ADMIN] CreateUser Error',
    props<{ payload: any }>()
);

export const updateUser = createAction(
    '[ADMIN] UpdateUser',
    props<{ user: EditUserModel }>()
);

export const updateUserSuccess = createAction(
    '[ADMIN] UpdateUser Success',
    props<{ user: UserDTO }>()
);

export const updateUserError = createAction(
    '[ADMIN] UpdateUser Error',
    props<{ payload: any }>()
);

export const updateUserPassword = createAction(
    '[ADMIN] UpdateUserPassword',
    props<{ passModel: EditUserPasswordModel }>()
);

export const updateUserPasswordSuccess = createAction(
    '[ADMIN] UpdateUserPassword Success',
    props<{ user: UserDTO }>()
);

export const updateUserPasswordError = createAction(
    '[ADMIN] UpdateUserPassword Error',
    props<{ payload: any }>()
);

export const deleteUser = createAction(
    '[ADMIN] DeleteUser',
    props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
    '[ADMIN] DeleteUser Success',
    props<{ userId: number }>()
);

export const deleteUserError = createAction(
    '[ADMIN] DeleteUser Error',
    props<{ payload: any }>()
);