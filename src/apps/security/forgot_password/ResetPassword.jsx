import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { API_URL, API_PORT } from "@env";

import ControlButton from "../../../components/buttons/ControlButton";
import BlueInput from "../../../components/inputs/BlueInput";
import SaveButton from "../../../components/buttons/SaveButton";

const ResetPassword = ({ navigation, route }) => {
    const { email, code } = route.params;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async () => {
        if (password === "" || confirmPassword === "") {
            console.log("Password fields cannot be empty");
            return;
        }

        if (password !== confirmPassword) {
            console.log("Passwords do not match");
            return;
        }

        const data = {
            email: email,
            newPassword: password,
            code: parseInt(code, 10),
        };

        console.log("Sending data:", data);

        try {
            const response = await fetch(
                `${API_URL}:${API_PORT}/recoveryPassword`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const responseJson = await response.json();

            console.log("Response JSON:", responseJson);

            if (
                response.status === 200 &&
                responseJson.message === "Password reset successful"
            ) {
                console.log("Password reset successful");
                navigation.navigate("SignIn");
            } else {
                console.log("Password reset failed");
                console.log("Error:", responseJson.message);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <ControlButton
                onPress={() => navigation.navigate("VerifyCode")}
                source={require("../../../../assets/images/arrow-go-back.png")}
                size={40}
                style={styles.arrow}
            />
            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.message}>
                Set your new password so you can login and access Contact Sync
            </Text>
            <Text style={styles.captionInput}>New password</Text>
            <BlueInput
                placeholder="Enter your new password"
                style={styles.passwordInput}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Text style={styles.captionInput2}>Confirm password</Text>
            <BlueInput
                placeholder="Confirm your new password"
                style={styles.confirmInput}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />
            <SaveButton
                title="Done"
                style={styles.continueButton}
                onPress={handleResetPassword}
            />
        </View>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#030B38",
        alignItems: "center",
        justifyContent: "center",
    },
    arrow: {
        position: "absolute",
        height: 40,
        left: 25,
        top: 42,
        color: "#fff",
    },
    image: {
        width: 40,
        height: 40,
    },
    title: {
        position: "absolute",
        width: 246,
        height: 33,
        left: 30,
        top: 101,
        fontFamily: "BROmnySemiBold",
        fontSize: 30,
        lineHeight: 39,
        color: "#fff",
    },
    message: {
        position: "absolute",
        width: 350,
        left: 30,
        top: 153,
        fontFamily: "BROmnyRegular",
        fontSize: 17,
        color: "#8C91B4",
    },
    captionInput: {
        position: "absolute",
        width: 163,
        height: 22,
        left: 32,
        top: 229,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        lineHeight: 20,
        color: "#FFFFFF",
    },
    captionInput2: {
        position: "absolute",
        width: 163,
        height: 22,
        left: 32,
        top: 339,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        lineHeight: 20,
        color: "#FFFFFF",
    },
    forgotPassword: {
        position: "absolute",
        right: 35,
        top: 499,
        fontFamily: "BROmnySemiBold",
        textAlign: "right",
        color: "#FFFFFF",
    },
    forgotPasswordText: {
        fontFamily: "BROmnySemiBold",
        fontSize: 15,
        lineHeight: 20,
        color: "#FFFFFF",
    },
    signUp: {
        position: "absolute",
        left: "calc(50% - 414px/2)",
        top: 320,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        lineHeight: 20,
        textAlign: "center",
        color: "#FFFFFF",
    },
    normalText: {
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        lineHeight: 20,
        color: "#FFFFFF",
    },
    boldText: {
        fontFamily: "BROmnySemiBold",
        fontSize: 15,
        lineHeight: 20,
        color: "#8C91B4",
    },
    passwordInput: {
        position: "absolute",
        top: 265,
    },
    confirmInput: {
        position: "absolute",
        top: 375,
    },
    continueButton: {
        position: "absolute",
        top: 470,
    },
});
