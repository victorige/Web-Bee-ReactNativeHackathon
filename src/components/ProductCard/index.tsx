import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Checkbox from 'expo-checkbox';
import { useDispatch } from 'react-redux';
import { updateProductValues, removeProduct } from "~src/slices/products";
import { FIELD_TYPES } from "~constants"
import DateComponent from "~components/DateComponent";
import { CatergoryFields } from "~models/categories-details";
import { ProductDetails, ProductFields } from "~models/product-details";
import Button from "~components/Button";

type IProductCard = {
    product: ProductDetails;
    categoryFields: CatergoryFields[];
    titleField: string;
}

const ProductCard = ({ product, categoryFields, titleField }: IProductCard) => {
    const dispatch = useDispatch();
    const titleFieldId: string = categoryFields.find((field: CatergoryFields) => field.id === titleField).id;
    const titleFieldName: string = product.fieldsValue.find((value: ProductFields) => value.id === titleFieldId)?.value;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{titleFieldName?.toString()}</Text>
            <View>
                <View>
                    {categoryFields.map(field => {
                        const fieldValue = product.fieldsValue.find(value => value.id === field.id)?.value ?? "";

                        const updateValue = (value) => {
                            dispatch(updateProductValues({
                                id: field.id,
                                value,
                                productId: product.id
                            }))
                        }

                        return <View key={field.id} style={{
                            display: 'flex',
                            flexDirection: field.type === FIELD_TYPES["CHECKBOX"] ? 'row' : 'column'
                        }}>
                            <Text style={styles.label}>{field.value}</Text>
                            {field.type === FIELD_TYPES["TEXT"] &&
                                <View style={styles.fieldConatiner}>
                                    <TextInput
                                        style={styles.fieldInput}
                                        onChangeText={updateValue}
                                        value={fieldValue}
                                        keyboardType="default"
                                    />
                                </View>}
                            {field.type === FIELD_TYPES["NUMBER"] &&
                                <View style={styles.fieldConatiner}>
                                    <TextInput
                                        style={styles.fieldInput}
                                        onChangeText={updateValue}
                                        value={fieldValue}
                                        keyboardType="numeric"
                                    />
                                </View>}
                            {field.type === FIELD_TYPES["CHECKBOX"] &&
                                <View style={styles.fieldConatiner}>
                                    <Checkbox
                                        value={Boolean(fieldValue)}
                                        onValueChange={updateValue}
                                    />
                                </View>}
                            {field.type === FIELD_TYPES["DATE"] &&
                                <View style={styles.fieldConatiner}>
                                    <DateComponent
                                        value={fieldValue}
                                        onChangeDate={updateValue}
                                    />
                                </View>}
                        </View>
                    })}
                </View>
            </View>
            <View style={styles.buttonAddRemoveContainer}>
                <Button onPress={() => { dispatch(removeProduct(product.id)) }} title="REMOVE" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderColor: '#000000',
        borderWidth: 2,
        margin: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    label: {
        fontSize: 16,
        fontWeight: 'normal',
        marginRight: 10,
        marginBottom: 5,
    },
    fieldConatiner: {
        marginBottom: 10
    },
    fieldInput: {
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 2,
        height: 40,
        padding: 10
    },
    buttonAddRemoveContainer: {
        display: "flex",
        flexDirection: 'row',
        marginTop: 15
    },
    addButton: {
        height: 35,
        backgroundColor: '#000000',
        padding: 6
    },
    addButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    }
});


export default ProductCard;