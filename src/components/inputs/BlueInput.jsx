import React from "react";
import { TextInput, View, StyleSheet, Image } from "react-native";

const BlueInput = ({
    placeholder,
    style,
    image,
    width = 350,
    height = 55,
    fontSize = 15,
}) => {
    return (
        <View style={[styles.container, { width, height }, style]}>
            <TextInput
                style={[
                    styles.input,
                    image && styles.inputWithImage,
                    { fontSize },
                ]}
                placeholder={placeholder}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
            {image && <Image source={image} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
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
        height: "100%",
        paddingRight: 55,
    },
    inputWithImage: {
        paddingRight: 55,
    },
    image: {
        position: "absolute",
        width: 23,
        height: 23,
        right: 20,
        top: (55 - 23) / 2,
        zIndex: 1,
    },
});

export default BlueInput;
