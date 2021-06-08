import { createAction, props } from "@ngrx/store";
import { ShopDTO } from "../models/ShopDTO";

export const loadShop = createAction(
    '[BACKOFFICE] LoadShop',
    props<{ ownerId: number }>()
);

export const loadShopSuccess = createAction(
    '[BACKOFFICE] LoadShop Success',
    props<{ shop: ShopDTO }>()
);

export const loadShopError = createAction(
    '[BACKOFFICE] LoadShop Error',
    props<{ payload: any }>()
);