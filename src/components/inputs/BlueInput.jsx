import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

const BlueInput = ({ placeholder, style }) => {
    return (
        <View style={[styles.container, style]}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 55,
    },
    input: {
        flex: 1,
        backgroundColor: "#1E264D",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.17)",
        borderRadius: 100,
        paddingHorizontal: 20,
        color: "white",
    },
});

export default BlueInput;