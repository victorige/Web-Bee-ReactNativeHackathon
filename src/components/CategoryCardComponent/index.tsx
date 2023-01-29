import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProductCard from "~components/ProductCard";
import { useSelector, useDispatch } from 'react-redux'
import { createProduct, selectProduct } from "~src/slices/products";
import { selectCategory } from "~src/slices/categories";
import NoItemComponent from "~components/NoItemComponent";
import { ProductDetails } from "~models/product-details";
import { CategoriesDetails } from "~models/categories-details";
import Button from "~components/Button";

const CategoryCardComponent = ({ categoryId }) => {
    const dispatch = useDispatch();
    const products: ProductDetails[] = useSelector(selectProduct);
    const categories: CategoriesDetails[] = useSelector(selectCategory);
    const category: CategoriesDetails = categories.find(category => category.id === categoryId);
    const categoryProduct: ProductDetails[] = products.filter(product => product.categoryId === categoryId);

    return (
        <View>
            <View>
                <Text style={styles.title}>{category.name}</Text>
                <View style={styles.button}>
                    <Button onPress={() => { dispatch(createProduct(category.id)) }} title="ADD NEW ITEM" />
                </View>
            </View>
            <View>
                {categoryProduct.length === 0 && <NoItemComponent />}
                {categoryProduct.map(product => <ProductCard key={product.id} titleField={category.titleField} categoryFields={category.fields} product={product} />)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        margin: 10
    },
    button: {
        margin: 10
    },
})
export default CategoryCardComponent;