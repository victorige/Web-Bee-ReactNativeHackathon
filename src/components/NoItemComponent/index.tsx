import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NoItemComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>No Item To Display</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    text: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 24
    }
});

export default NoItemComponent;