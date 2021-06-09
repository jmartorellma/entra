export interface ProductDTO {
    Id: number,
    Code: string;            
    Name: string;       
    Description: string;           
    IsActive: boolean;           
    Price: number;          
    Tax: number;          
    Pvp: number;          
    Picture: string; 
    CreationDate: string;        
    ShopId: number;
    ShopName: string; 
    ProviderId: number,          
    Categories: number[];        
    Stock: number; 
}