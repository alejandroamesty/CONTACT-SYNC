import React, { useState } from "react";
import { TextInput, View, StyleSheet, Image, Text } from "react-native";

const GrayInput = ({
    placeholder,
    onChangeText,
    defaultValue,
    style,
    image,
    width = 360,
    height = 40,
    fontSize = 15,
    borderRadius = 18,
    characterLimit,
}) => {
    const [value, setValue] = useState(defaultValue);
    const [errorMessage, setErrorMessage] = useState("");
    const multiline = height > 40;

    const handleChangeText = (text) => {
        if (characterLimit && text.length > characterLimit) {
            setErrorMessage(
                `Character limit exceeded. Maximum ${characterLimit} characters allowed.`
            );
        } else {
            setErrorMessage("");
            setValue(text);
            if (onChangeText) onChangeText(text);
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.inputContainer,
                    { width, height, borderRadius },
                    style,
                ]}
            >
                <TextInput
                    style={[
                        styles.input,
                        image && styles.inputWithImage,
                        { fontSize },
                        multiline && styles.multilineInput,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="#7D7D7D"
                    onChangeText={handleChangeText}
                    value={value}
                    multiline={multiline}
                    numberOfLines={multiline ? undefined : 1}
                />
                {image && <Image source={image} style={styles.image} />}
            </View>
            {errorMessage !== "" && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EDEEF0",
        paddingHorizontal: 20,
    },
    input: {
        flex: 1,
        fontFamily: "BROmnyRegular",
        color: "black",
        paddingRight: 16,
    },
    inputWithImage: {
        paddingRight: 16,
    },
    multilineInput: {
        paddingTop: 16,
    },
    image: {
        width: 20,
        height: 20,
    },
    errorMessage: {
        color: "#F4385A",
        fontSize: 12,
        fontFamily: "BROmnyRegular",
        marginBottom: 5,
    },
});

export default GrayInput;
