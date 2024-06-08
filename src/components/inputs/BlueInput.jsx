import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const BlueInput = ({
    placeholder,
    onChangeText,
    value,
    style,
    image,
    width = 350,
    height = 55,
    fontSize = 15,
    backgroundColor = "#1E264D",
    type,
    isPassword = false,
}) => {
    const [error, setError] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword);

    const validateEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(text);
    };

    const validatePassword = (text) => {
        const minLength = 8;
        const maxLength = 20;

        if (text.length < minLength) {
            return `Must be at least ${minLength} characters`;
        }
        if (text.length > maxLength) {
            return `Must be no more than ${maxLength} characters`;
        }
        return null;
    };

    const handleOnChangeText = (text) => {
        if (onChangeText) {
            onChangeText(text);
            if (type === "email" && !validateEmail(text)) {
                setError("Invalid email format");
            } else if (type === "password") {
                const passwordError = validatePassword(text);
                setError(passwordError);
            } else {
                setError(null);
            }
        }
    };

    return (
        <View style={[styles.container, { width, height }, style]}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        image && styles.inputWithImage,
                        { fontSize, backgroundColor },
                        error && styles.inputError,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    onChangeText={handleOnChangeText}
                    value={value}
                    secureTextEntry={!isPasswordVisible && (isPassword || type === "password")}
                />
                {image && <Image source={image} style={styles.image} />}
                {isPassword && (
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Icon
                            name={isPasswordVisible ? "visibility" : "visibility-off"}
                            size={23}
                            color="white"
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: 350,
        height: 55,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.17)",
        borderRadius: 100,
        paddingHorizontal: 20,
        color: "white",
        height: "100%",
    },
    inputWithImage: {
        paddingRight: 55,
    },
    inputError: {
        borderColor: "#F4385A",
    },
    image: {
        position: "absolute",
        width: 23,
        height: 23,
        right: 20,
        top: (55 - 23) / 2,
        zIndex: 1,
    },
    eyeButton: {
        position: "absolute",
        right: 20,
        padding: 10,
    },
    error: {
        color: "#F4385A",
        fontFamily: "BROmnyRegular",
        fontSize: 12,
        position: "absolute",
        top: 60,
        right: 0,
        marginTop: 5,
    },
});

export default BlueInput;
