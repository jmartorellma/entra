export interface CreateProductModel {
    Code: string;            
    Name: string;       
    Description: string;           
    IsActive: boolean;           
    Price: number;          
    Tax: number;          
    Pvp: number;            
    ShopId: number;
    ProviderId: number,          
    CategoryIdList: number[];        
    Stock: number; 
}