export interface EditProductModel {
    Id: number;
    Code: string;            
    Name: string;       
    Description: string;           
    IsActive: boolean;           
    Price: number;          
    Tax: number;          
    Pvp: number;                
    CategoryIdList: number[];        
    Stock: number; 
}