export interface ProductDTO {
    id: number,
    code: string;            
    name: string;       
    description: string;           
    isActive: boolean;           
    price: number;          
    tax: number;          
    pvp: number;          
    picture: string; 
    creationDate: string;        
    shopId: number;
    shopName: string; 
    providerId: number,          
    categories: number[];        
    stock: number; 
}