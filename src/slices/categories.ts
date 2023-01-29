import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~store"
import { CategoriesDetails, CatergoryFields } from "~src/models/categories-details";
import uuid from "react-native-uuid";
import { FIELD_TYPES, NEW_CATEGORY } from "~constants";



const builderNewField = (type: string) => {
    const field: CatergoryFields = {
        id: uuid.v4().toString(),
        type: FIELD_TYPES[type],
        value: ""
    }
    return field;
}

const builderNewCatergory = (categoriesNameList: Array<string>) => {
    const field: CatergoryFields = builderNewField(FIELD_TYPES["TEXT"]);

    const category: CategoriesDetails = {
        id: uuid.v4().toString(),
        name: NEW_CATEGORY,
        titleField: field.id,
        fields: [field]
    }
    return category;
}

const initialState: CategoriesDetails[] = [];

export const categorySlice = createSlice({
    name: 'appCategory',
    initialState,
    reducers: {
        createCategory: (state: CategoriesDetails[]) => {
            const categoriesNameList = state.map(category => category.name);
            if (!categoriesNameList.includes(NEW_CATEGORY)) return [...state, builderNewCatergory(categoriesNameList)];
        },
        removeCategoryById: (state: CategoriesDetails[], { payload }: PayloadAction<string>) => {
            return state.filter(category => category.id !== payload);
        },
        updateCompanyName: (state: CategoriesDetails[], { payload }: PayloadAction<any>) => {
            const categoriesNameList = state.map(category => category.name);
            if (!categoriesNameList.includes(payload.value)) state.find(category => category.id === payload.id).name = payload.value;
        },
        updateFieldByCompanyID: (state: CategoriesDetails[], { payload }: PayloadAction<any>) => {
            state.find(category => category.id === payload.categoryId).fields.find(field => field.id === payload.id).value = payload.value;
        },
        removeFieldByCategoryById: (state: CategoriesDetails[], { payload }: PayloadAction<any>) => {
            const categoryFields = state.find(category => category.id === payload.categoryId);
            categoryFields.fields = categoryFields.fields.filter(field => field.id !== payload.id);
        },
        addFieldByCategoryId: (state: CategoriesDetails[], { payload }: PayloadAction<any>) => {
            const categoryFields = state.find(category => category.id === payload.categoryId);
            categoryFields.fields.push(builderNewField(payload.type));
        },
        changeFieldTitleByCategoryId: (state: CategoriesDetails[], { payload }: PayloadAction<any>) => {
            const categoryFields = state.find(category => category.id === payload.categoryId);
            categoryFields.titleField = categoryFields.fields.find(field => field.id === payload.id).id;
        },


    },
})

export const {
    changeFieldTitleByCategoryId,
    createCategory,
    removeCategoryById,
    updateCompanyName,
    updateFieldByCompanyID,
    addFieldByCategoryId,
    removeFieldByCategoryById
} = categorySlice.actions;

export const selectCategory = (state: RootState) => state.appCategory;


export default categorySlice.reducer