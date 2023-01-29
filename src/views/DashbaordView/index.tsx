import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { selectCategory } from "~src/slices/categories";
import { useSelector } from 'react-redux';
import CategoryCardComponent from "~components/CategoryCardComponent";
import NoItemComponent from "~components/NoItemComponent";
import { CategoriesDetails } from "~models/categories-details";

const DashboardView = () => {
  const categories: CategoriesDetails[] = useSelector(selectCategory);

  return (
    <ScrollView style={{ flex: 1 }}>
      {categories.length === 0 && <NoItemComponent />}
      {categories.map(category =>
        <View style={styles.container} key={category.id} >
          <CategoryCardComponent categoryId={category.id} />
        </View>)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderColor: '#000000',
    borderWidth: 2,
    backgroundColor: '#ffffff'
  },
});


export default DashboardView;