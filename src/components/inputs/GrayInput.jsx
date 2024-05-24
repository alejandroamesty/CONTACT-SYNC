import React from "react";
import { TextInput, View, StyleSheet, Image } from "react-native";

const GrayInput = ({
    placeholder,
    onChangeText,
    value,
    style,
    image,
    width = 360,
    height = 40,
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
                placeholderTextColor="#7D7D7D"
                onChangeText={onChangeText}
                value={value}
            />
            {image && <Image source={image} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: 360,
        height: 40,
    },
    input: {
        flex: 1,
        backgroundColor: "#EDEEF0",
        borderRadius: 100,
        paddingHorizontal: 20,
        color: "black",
        height: "100%",
        paddingRight: 16,
    },
    inputWithImage: {
        paddingRight: 16,
    },
    image: {
        position: "absolute",
        width: 20,
        height: 20,
        right: 20,
        top: (40 - 20) / 2,
        zIndex: 1,
    },
});

export default GrayInput;
