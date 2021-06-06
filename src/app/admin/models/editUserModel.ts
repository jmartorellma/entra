export interface EditUserModel {
    Username: string;
    Name: string;
    Surname: string;
    PhoneNumber: string;
    Email: string;
    Role: string;
    IsProfile: boolean;
}

export interface EditUserPasswordModel {
    OldPassword: string;
    Password: string;
    ConfirmPassword: string;
}