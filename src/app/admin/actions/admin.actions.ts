import { createAction, props } from "@ngrx/store";
import { ShopDTO } from "src/app/backoffice/models/ShopDTO";
import { UserDTO } from "src/app/profile/models/userDTO";
import { CreatePaymentStatusModel } from "../models/createPaymentStatusModel";
import { CreatePurchaseTypeModel } from "../models/createPurchaseTypeModel";
import { CreateShopModel } from "../models/createShopModel";
import { CreateUserModel } from "../models/createUserModel";
import { EditPaymentStatusModel } from "../models/editPaymentStatusModel";
import { EditPurchaseTypeModel } from "../models/editPurchaseTypeModel";
import { EditShopModel } from "../models/editShopModel";
import { EditUserModel, EditUserPasswordModel } from "../models/editUserModel";
import { PaymentStatusDTO } from "../models/PaymentStatusDTO";
import { PurchaseTypeDTO } from "../models/PurchaseTypeDTO";


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

export const loadShops = createAction(
    '[ADMIN] LoadShops'
);

export const loadShopsSuccess = createAction(
    '[ADMIN] LoadShops Success',
    props<{ shopList: ShopDTO[] }>()
);

export const loadShopsError = createAction(
    '[ADMIN] LoadShops Error',
    props<{ payload: any }>()
);

export const createShop = createAction(
    '[ADMIN] CreateShop',
    props<{ shop: CreateShopModel }>()
);

export const createShopSuccess = createAction(
    '[ADMIN] CreateShop Success',
    props<{ shop: ShopDTO }>()
);

export const createShopError = createAction(
    '[ADMIN] CreateShop Error',
    props<{ payload: any }>()
);

export const updateShop = createAction(
    '[ADMIN] UpdateShop',
    props<{ shop: EditShopModel }>()
);

export const updateShopSuccess = createAction(
    '[ADMIN] UpdateShop Success',
    props<{ shop: ShopDTO }>()
);

export const updateShopError = createAction(
    '[ADMIN] UpdateShop Error',
    props<{ payload: any }>()
);

export const deleteShop = createAction(
    '[ADMIN] Deleteshop',
    props<{ shopId: number }>()
);

export const deleteShopSuccess = createAction(
    '[ADMIN] Deleteshop Success',
    props<{ shopId: number }>()
);

export const deleteShopError = createAction(
    '[ADMIN] Deleteshop Error',
    props<{ payload: any }>()
);

export const loadPaymentStatusSuccess = createAction(
    '[ADMIN] LoadPaymentStatus Success',
    props<{ paymentStatusList: PaymentStatusDTO[] }>()
);

export const loadPaymentStatusError = createAction(
    '[ADMIN] LoadPaymentStatus Error',
    props<{ payload: any }>()
);

export const createPaymentStatus = createAction(
    '[ADMIN] CreatePaymentStatus',
    props<{ paymentStatus: CreatePaymentStatusModel }>()
);

export const createPaymentStatusSuccess = createAction(
    '[ADMIN] CreatePaymentStatus Success',
    props<{ paymentStatus: PaymentStatusDTO }>()
);

export const createPaymentStatusError = createAction(
    '[ADMIN] CreatePaymentStatus Error',
    props<{ payload: any }>()
);

export const updatePaymentStatus = createAction(
    '[ADMIN] UpdatePaymentStatus',
    props<{ paymentStatus: EditPaymentStatusModel }>()
);

export const updatePaymentStatusSuccess = createAction(
    '[ADMIN] UpdatePaymentStatus Success',
    props<{ paymentStatus: PaymentStatusDTO }>()
);

export const updatePaymentStatusError = createAction(
    '[ADMIN] UpdatePaymentStatus Error',
    props<{ payload: any }>()
);

export const deletePaymentStatus = createAction(
    '[ADMIN] DeletePaymentStatus',
    props<{ paymentStatusId: number }>()
);

export const deletePaymentStatusSuccess = createAction(
    '[ADMIN] DeletePaymentStatus Success',
    props<{ paymentStatusId: number }>()
);

export const deletePaymentStatusError = createAction(
    '[ADMIN] DeletePaymentStatus Error',
    props<{ payload: any }>()
);

export const loadPurchaseTypes = createAction(
    '[ADMIN] LoadPurchaseTypes'
);

export const loadPurchaseTypesSuccess = createAction(
    '[ADMIN] LoadPurchaseTypes Success',
    props<{ purchaseTypeList: PurchaseTypeDTO[] }>()
);

export const loadPurchaseTypesError = createAction(
    '[ADMIN] LoadPurchaseTypes Error',
    props<{ payload: any }>()
);

export const createPurchaseType = createAction(
    '[ADMIN] CreatePurchaseType',
    props<{ purchaseType: CreatePurchaseTypeModel }>()
);

export const createPurchaseTypeSuccess = createAction(
    '[ADMIN] CreatePurchaseType Success',
    props<{ purchaseType: PurchaseTypeDTO }>()
);

export const createPurchaseTypeError = createAction(
    '[ADMIN] CreatePurchaseType Error',
    props<{ payload: any }>()
);

export const updatePurchaseType = createAction(
    '[ADMIN] UpdatePurchaseType',
    props<{ purchaseType: EditPurchaseTypeModel }>()
);

export const updatePurchaseTypeSuccess = createAction(
    '[ADMIN] UpdatePurchaseType Success',
    props<{ purchaseType: PurchaseTypeDTO }>()
);

export const updatePurchaseTypeError = createAction(
    '[ADMIN] UpdatePurchaseType Error',
    props<{ payload: any }>()
);

export const deletePurchaseType = createAction(
    '[ADMIN] DeletePurchaseType',
    props<{ purchaseTypeId: number }>()
);

export const deletePurchaseTypeSuccess = createAction(
    '[ADMIN] DeletePurchaseType Success',
    props<{ purchaseTypeId: number }>()
);

export const deletePurchaseTypeError = createAction(
    '[ADMIN] DeletePurchaseType Error',
    props<{ payload: any }>()
);

export const loadPaymentStatus = createAction(
    '[ADMIN] LoadPaymentStatus'
);
