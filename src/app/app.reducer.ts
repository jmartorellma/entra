
import { ActionReducerMap } from '@ngrx/store';
import * as reducersAccount from './account/reducers';
// import { routerReducer } from '@ngrx/router-store';
// import * as fromRouter from '@ngrx/router-store';
import { AccountEffects } from './account/effects';

export interface AppState {
    account: reducersAccount.AccountState;
    // router: fromRouter.RouterReducerState<any>;
}

export const appReducers: ActionReducerMap<AppState> = {
    // router: routerReducer,
    account: reducersAccount.accountReducer
};

export const EffectsArray: any[] = [AccountEffects];
