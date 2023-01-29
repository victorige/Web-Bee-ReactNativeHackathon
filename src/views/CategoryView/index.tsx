import React from "react";
import { ScrollView } from "react-native";
import CategoryCardComponent from "~components/CategoryCardComponent";

type CategoryId = {
    categoryId: string
}

const CategoryView = (props) => {
    const { categoryId }: CategoryId = props.route.params;

    return (
        <ScrollView style={{ flex: 1 }}>
            <CategoryCardComponent categoryId={categoryId} />
        </ScrollView>

    );
};

export default CategoryView;