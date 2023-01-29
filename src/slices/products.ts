import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~store";
import { ProductDetails, ProductFields } from "~src/models/product-details";
import uuid from "react-native-uuid";

const builderNewProductValue = (id: string, value: string) => {
    const productFields: ProductFields = {
        id: id,
        value: value
    }
    return productFields;
}

const builderNewProduct = (categoryId: string) => {
    const product: ProductDetails = {
        id: uuid.v4().toString(),
        categoryId,
        fieldsValue: []
    }
    return product;
}

const initialState: ProductDetails[] = [];

export const productSlice = createSlice({
    name: 'appProduct',
    initialState,
    reducers: {
        createProduct: (state: ProductDetails[], { payload }: PayloadAction<any>) => {
            return [...state, builderNewProduct(payload)];
        },
        updateProductValues: (state: ProductDetails[], { payload }: PayloadAction<any>) => {
            const product = state.find(product => product.id === payload.productId);
            const productValue = product.fieldsValue.find(field => field.id === payload.id);
            if (productValue) {
                productValue.value = payload.value;
            } else {
                product.fieldsValue.push(builderNewProductValue(payload.id, payload.value));
            }
        },
        removeProduct: (state: ProductDetails[], { payload }: PayloadAction<any>) => {
            return state.filter(product => product.id !== payload);
        }

    },
})

export const { createProduct, updateProductValues, removeProduct } = productSlice.actions;

export const selectProduct = (state: RootState) => state.appProduct;


export default productSlice.reducer