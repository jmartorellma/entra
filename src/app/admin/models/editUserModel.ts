export interface EditUserModel {
    Id: number;
    Username: string;
    Name: string;
    Surname: string;
    PhoneNumber: string;
    Email: string;
    IsActive: boolean;
    IsProfile: boolean;
}

export interface EditUserPasswordModel {
    Id: number;
    OldPassword: string;
    Password: string;
    ConfirmPassword: string;
    IsProfile: boolean;
}