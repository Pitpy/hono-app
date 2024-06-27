export type ResObject = {
    code: number;
    message: string;
    data?: any;
}

type Address = {
    village: string;
    district: string;
    province: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: Address
}