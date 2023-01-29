export type CategoriesDetails = {
    id: string;
    name: string;
    titleField: string;
    fields: CatergoryFields[];
}

export type CatergoryFields = {
    id: string;
    type: string;
    value: string;
}

export type UpdateCompanyNamePayload = {
    id: string;
    value: string;
}