
import { ActionReducerMap } from '@ngrx/store';
import * as reducersAccount from './account/reducers';
import * as reducersAdmin from './admin/reducers';
import * as reducersBackoffice from './backoffice/reducers';
import * as reducersProfile from './profile/reducers';
// import { routerReducer } from '@ngrx/router-store';
// import * as fromRouter from '@ngrx/router-store';
import { AccountEffects } from './account/effects';
import { AdminEffects } from './admin/effects';
import { BackofficeEffects } from './backoffice/effects';
import { ProfileEffects } from './profile/effects';

export interface AppState {
    account: reducersAccount.AccountState;
    admin: reducersAdmin.AdminState;
    backoffice: reducersBackoffice.BackofficeState;
    profile: reducersProfile.ProfileState;
    // router: fromRouter.RouterReducerState<any>;
}

export const appReducers: ActionReducerMap<AppState> = {
    // router: routerReducer,
    account: reducersAccount.accountReducer,
    admin: reducersAdmin.adminReducer,
    backoffice: reducersBackoffice.backofficeReducer,
    profile: reducersProfile.profileReducer
};

export const EffectsArray: any[] = [
    AccountEffects,
    AdminEffects,
    BackofficeEffects,
    ProfileEffects, 
];
