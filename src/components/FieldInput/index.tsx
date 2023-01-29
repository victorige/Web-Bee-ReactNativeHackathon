import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux'
import { updateFieldByCompanyID, removeFieldByCategoryById, } from "~src/slices/categories";
import { AntDesign } from '@expo/vector-icons';
import { CatergoryFields } from "~src/models/categories-details";

type IFieldInput = {
    categoryId: string;
    field: CatergoryFields;
}

const FieldInput = ({ categoryId, field }: IFieldInput) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Field: <Text style={styles.labelType}>{field.type}</Text></Text>
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.fieldInput}
                    onChangeText={(value) => {
                        dispatch(updateFieldByCompanyID({ categoryId, id: field.id, value }))
                    }}
                    value={field.value}
                    keyboardType="default"
                />
                    <TouchableOpacity
                        onPress={() => dispatch(removeFieldByCategoryById({ categoryId, id: field.id }))}>
                        <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10
    },
    inputContainer: {
        display: "flex",
        flexDirection: 'row',
    },

    label: {
        fontSize: 12,
        fontWeight: 'normal',
        marginBottom: 1
    },

    labelType: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

    fieldInput: {
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 2,
        height: 40,
        marginBottom: 10,
        padding: 10,
        width: '50%',
        marginRight: 10

    }
});


export default FieldInput;