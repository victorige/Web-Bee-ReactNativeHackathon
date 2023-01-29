export const NEW_CATEGORY: string = "New Category";

export enum FIELD_TYPES {
  TEXT = "TEXT",
  DATE = "DATE",
  CHECKBOX = "CHECKBOX",
  NUMBER = "NUMBER"
}

export const FIELD_TYPES_LISTS = Object.keys(FIELD_TYPES)
  .map(function (key) {
    return FIELD_TYPES[key];
  });