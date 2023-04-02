import { PropsWithChildren } from "react";

export interface ItemsJson extends PropsWithChildren {
    id: number;
    url: string;
    name: string;
    name_desc: string;
    type_size: string;
    size: string;
    barcode: number;
    manufacturer: string;
    brand: string;
    description: string;
    price: number;
    bodyCare: boolean;
    handCare: boolean;
    faceCare: boolean;
}