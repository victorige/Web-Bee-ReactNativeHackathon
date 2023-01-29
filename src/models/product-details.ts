export type ProductDetails = {
    id: string;
    categoryId: string;
    fieldsValue: ProductFields[];
}

export type ProductFields = {
    id: string;
    value: string;
}
