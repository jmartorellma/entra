export interface CreateShopModel {
    Nif: string,           
    IsActive: boolean,      
    Code: string,          
    Name: string,          
    Phone: string,         
    Email: string,         
    Taxes: number,         
    MinAmountTaxes: number,
    Address: string,       
    City: string,          
    Picture: string,       
    Web: string,           
    OwnerId: number
}