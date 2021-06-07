export interface CreateUserModel {
    Username: string;
    Name: string;
    Surname: string;
    PhoneNumber: string;
    Email: string;
    IsActive: boolean;
    Role: string;
    Password: string;
    ConfirmPassword: string;
}