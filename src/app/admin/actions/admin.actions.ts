import { createAction, props } from "@ngrx/store";
import { UserDTO } from "src/app/profile/models/userDTO";
import { CreateUserModel } from "../models/createUserModel";


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