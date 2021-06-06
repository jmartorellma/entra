
import { ActionReducerMap } from '@ngrx/store';
import * as reducersAccount from './account/reducers';
import * as reducersAdmin from './admin/reducers';
import * as reducersProfile from './profile/reducers';
// import { routerReducer } from '@ngrx/router-store';
// import * as fromRouter from '@ngrx/router-store';
import { AccountEffects } from './account/effects';
import { AdminEffects } from './admin/effects';
import { ProfileEffects } from './profile/effects';

export interface AppState {
    account: reducersAccount.AccountState;
    admin: reducersAdmin.AdminState;
    profile: reducersProfile.ProfileState;
    // router: fromRouter.RouterReducerState<any>;
}

export const appReducers: ActionReducerMap<AppState> = {
    // router: routerReducer,
    account: reducersAccount.accountReducer,
    admin: reducersAdmin.adminReducer,
    profile: reducersProfile.profileReducer
};

export const EffectsArray: any[] = [
    AccountEffects,
    AdminEffects,
    ProfileEffects, 
];
