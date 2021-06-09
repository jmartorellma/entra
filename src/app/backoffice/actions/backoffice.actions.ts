import { createAction, props } from "@ngrx/store";
import { PictureDTO } from "src/app/backoffice/models/PictureDTO";
import { EditShopPictureModel } from "../models/edtiShopPictureModel";
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

export const uploadShopPicture = createAction(
    '[BACKOFFICE] UploadShopPicture',
    props<{ editShopPictureModel: EditShopPictureModel }>()
);

export const uploadShopPictureSuccess = createAction(
    '[BACKOFFICE] UploadShopPicture Success',
    props<{ picture: PictureDTO }>()
);

export const uploadShopPictureError = createAction(
    '[BACKOFFICE] UploadShopPicture Error',
    props<{ payload: any }>()
);