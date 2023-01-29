import React from "react";
import { View, ScrollView } from "react-native";
import CategoryCard from "~components/CategoryCard";
import { useSelector, useDispatch } from 'react-redux'
import { selectCategory, createCategory } from "~src/slices/categories";
import { CategoriesDetails } from "~models/categories-details";
import NoItemComponent from "~components/NoItemComponent";
import Button from "~components/Button";

const ManageCategoryView = () => {
  const dispatch = useDispatch();
  const categories: CategoriesDetails[] = useSelector(selectCategory);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          {categories.length === 0 && <NoItemComponent />}
          {categories.map(category => <CategoryCard key={category.id} category={category} />)}
        </View>
      </ScrollView>
      <View style={{ margin: 10 }}>
        <Button onPress={() => dispatch(createCategory())} title="ADD NEW CATEGORY" />
      </View>
    </View>
  );
};

export default ManageCategoryView;