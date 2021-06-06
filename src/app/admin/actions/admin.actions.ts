import { createAction, props } from "@ngrx/store";
import { UserDTO } from "src/app/profile/models/userDTO";


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