import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./views/index.routes";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { MenuProvider } from "react-native-popup-menu";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MenuProvider>
                    <StatusBar />
                    <NavigationContainer>
                        <Router />
                    </NavigationContainer>
                </MenuProvider>
            </PersistGate>
        </Provider>)
}

registerRootComponent(App);