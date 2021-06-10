export interface PurchaseDTO {
    id: number;
    productList: PurchaseProductDTO[],
    code: string;
    amount: number; 
    userId: number;
    userName: string;          
    status: string;
    statusDate: string; 
    creationDate: string;          
    paymentMethod: string;
    purchaseType: string; 
    paymentStatus: string; 
}

export interface PurchaseProductDTO {
    id: number;
    code: string;            
    name: string;              
    price: number;          
    tax: number;          
    pvp: number;          
    picture: string;
    shop: string; 
}