import React from "react";
import { SceneName } from "~types/SceneName";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ManageCategoryView from "~views/ManageCategoryView";
import DashboardView from "~views/DashbaordView";
import CategoryView from "~views/CategoryView";
import { useSelector } from "react-redux";
import { selectCategory } from "~src/slices/categories";
import { CategoriesDetails } from "~models/categories-details";

const Drawer = createDrawerNavigator();

const Router = () => {

    const categories: CategoriesDetails[] = useSelector(selectCategory);

    return (
        <Drawer.Navigator initialRouteName={SceneName.DashBoard}>
            <Drawer.Screen name={SceneName.DashBoard} component={DashboardView} />

            {categories.map(category => {
                if (category.name)
                    return <Drawer.Screen initialParams={{ categoryId: category.id }} key={category.id} name={category.name} component={CategoryView} />
            })}

            <Drawer.Screen name={SceneName.ManageCategory} component={ManageCategoryView} />
        </Drawer.Navigator>)
}

export default Router;