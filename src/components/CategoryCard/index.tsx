import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch } from 'react-redux'
import { removeCategoryById, updateCompanyName, addFieldByCategoryId, changeFieldTitleByCategoryId } from "~src/slices/categories";
import FieldInput from "~components/FieldInput";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { FIELD_TYPES_LISTS } from "~constants";
import { CategoriesDetails } from "~models/categories-details";
import Button from "~components/Button";

type ICategoryCard = {
    category: CategoriesDetails
}

const CategoryCard = ({ category }: ICategoryCard) => {
    const dispatch = useDispatch();
    const titleFieldName: string = category.fields.find(field => field.id === category.titleField).value;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{category.name}</Text>
            <View>
                <Text style={styles.label}>Company Name</Text>
                <TextInput
                    style={styles.fieldInput}
                    onChangeText={(value) => {
                        dispatch(updateCompanyName({ id: category.id, value }))
                    }}
                    value={category.name}
                    keyboardType="default"
                />
            </View>

            <View>
                {category.fields.map(field => <FieldInput key={field.id} categoryId={category.id} field={field} />)}
            </View>

            <View style={styles.button}>
                <Menu>
                    <MenuTrigger>
                        <View style={styles.addButton}>
                            <Text style={styles.addButtonText}>TITLE FIELD: {titleFieldName}</Text>
                        </View>
                    </MenuTrigger>
                    <MenuOptions>
                        {category.fields.map(field =>
                            <MenuOption key={field.id} onSelect={() => dispatch(
                                changeFieldTitleByCategoryId({ categoryId: category.id, id: field.id }))} text={field.value}
                                customStyles={{ optionWrapper: styles.optionWrapper }}
                            />
                        )}
                    </MenuOptions>
                </Menu>
            </View>

            <View style={styles.buttonAddRemoveContainer}>
                <View style={styles.button}>
                    <Menu>
                        <MenuTrigger>
                            <View style={styles.addButton}>
                                <Text style={styles.addButtonText}>ADD NEW FIELD</Text>
                            </View>
                        </MenuTrigger>
                        <MenuOptions>
                            {FIELD_TYPES_LISTS.map(type =>
                                <MenuOption key={type} onSelect={() => dispatch(
                                    addFieldByCategoryId({ categoryId: category.id, type }))} text={type}
                                    customStyles={{ optionWrapper: styles.optionWrapper }}
                                />)
                            }
                        </MenuOptions>
                    </Menu>
                </View>

                <View style={styles.button}>
                    <Button
                        onPress={() => dispatch(removeCategoryById(category.id))}
                        title="REMOVE"
                    />
                </View>
            </View>

        </View>
    );
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
        fontSize: 12,
        fontWeight: 'normal',
        marginBottom: 1
    },

    fieldInput: {
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 2,
        height: 40,
        marginBottom: 10,
        padding: 10
    },
    buttonAddRemoveContainer: {
        display: "flex",
        flexDirection: 'row',
    },
    button: {
        margin: 10
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    addButtonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    optionWrapper: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15
    }
});


export default CategoryCard;